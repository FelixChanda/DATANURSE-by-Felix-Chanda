import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  collection,
  getDocFromServer,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { ResourceItem } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore using the configured database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Validate connection to Firestore on initial boot
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    const testDocRef = doc(db, 'resources', '__connection_test__');
    await getDocFromServer(testDocRef);
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initializing.');
    }
    return false;
  }
}

/**
 * Save or sync a resource document / file item to Firestore
 */
export async function saveResourceToFirestore(item: ResourceItem): Promise<void> {
  const path = `resources/${item.id}`;
  try {
    const cleanItem = JSON.parse(JSON.stringify(item));
    await setDoc(doc(db, 'resources', item.id), {
      ...cleanItem,
      updatedAt: item.updatedAt || new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Fetch all resources from Firestore
 */
export async function fetchResourcesFromFirestore(): Promise<ResourceItem[]> {
  const path = 'resources';
  try {
    const q = query(collection(db, 'resources'), orderBy('updatedAt', 'desc'));
    const snapshot = await getDocs(q);
    const resources: ResourceItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as ResourceItem;
      if (data && data.id && data.id !== '__connection_test__') {
        resources.push(data);
      }
    });
    return resources;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Subscribe in real-time to Firestore resources collection.
 * Triggers callback immediately and whenever any document is uploaded or updated.
 */
export function subscribeToFirestoreResources(callback: (resources: ResourceItem[]) => void) {
  const q = query(collection(db, 'resources'), orderBy('updatedAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const resources: ResourceItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as ResourceItem;
        if (data && data.id && data.id !== '__connection_test__') {
          resources.push(data);
        }
      });
      callback(resources);
    },
    (error) => {
      console.warn('Firestore real-time snapshot error:', error);
    }
  );
}

/**
 * Delete a resource from Firestore
 */
export async function deleteResourceFromFirestore(id: string): Promise<void> {
  const path = `resources/${id}`;
  try {
    await deleteDoc(doc(db, 'resources', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Auth utilities
 */
export async function signInWithGoogleFirebase(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result.user;
  } catch (error) {
    console.error('Firebase Auth sign in error:', error);
    return null;
  }
}

export async function signOutFirebase(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Firebase Auth sign out error:', error);
  }
}

export function subscribeAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
