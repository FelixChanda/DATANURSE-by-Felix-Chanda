import { ResourceItem, ResourceCategory } from '../types';
import { fetchGitHubRepoFiles, getAutoSyncedGitHubFiles, DEFAULT_GITHUB_REPO } from './githubDocumentSyncService';

/**
 * Clean GitHub Repository Document Sync Service
 * Completely replaces legacy Google Drive dependencies with direct public GitHub repository sync
 * Target Repository: FelixChanda/Datanurse_repofiles
 */

export const initAuthListener = (
  onSuccess: (user: any, token: string) => void,
  _onFailure: () => void
) => {
  // Pass through default GitHub sync user
  onSuccess(
    { email: 'FelixChanda/Datanurse_repofiles', displayName: 'GitHub Repo Sync' },
    'github-public-sync'
  );
  return () => {};
};

export const signInWithGoogleDrive = async (): Promise<{ user: any; accessToken: string } | null> => {
  return {
    user: { email: 'FelixChanda/Datanurse_repofiles', displayName: 'GitHub Repo Sync' },
    accessToken: 'github-public-sync'
  };
};

export const signOutGoogleDrive = async () => {};

export const getCachedAccessToken = () => 'github-public-sync';

export interface DriveCategoryFolder {
  id: string;
  name: string;
  category: ResourceCategory;
}

export const inferCategoryFromName = (name: string): ResourceCategory => {
  const lower = name.toLowerCase();
  if (lower.includes('module')) return 'modules';
  if (lower.includes('past') || lower.includes('paper') || lower.includes('exam') || lower.includes('nle') || lower.includes('licensure')) return 'past_papers';
  if (lower.includes('textbook') || lower.includes('book') || lower.includes('manual') || lower.includes('pharmacology') || lower.includes('anatomy')) return 'textbooks';
  if (lower.includes('note') || lower.includes('lecture') || lower.includes('summary') || lower.includes('guide')) return 'notes';
  return 'documents';
};

export const ensureDriveCategoryFolders = async (_accessToken?: string): Promise<Record<string, ResourceCategory>> => {
  return {
    'modules': 'modules',
    'past_papers': 'past_papers',
    'textbooks': 'textbooks',
    'notes': 'notes',
    'documents': 'documents'
  };
};

export const fetchDriveCategoryFiles = async (_accessToken?: string | null): Promise<ResourceItem[]> => {
  return await fetchGitHubRepoFiles(DEFAULT_GITHUB_REPO);
};

export const getAutoSyncedCategoryFiles = (): ResourceItem[] => {
  return getAutoSyncedGitHubFiles(DEFAULT_GITHUB_REPO.owner, DEFAULT_GITHUB_REPO.repo, DEFAULT_GITHUB_REPO.branch);
};
