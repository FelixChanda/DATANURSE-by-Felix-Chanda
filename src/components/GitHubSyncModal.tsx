import React, { useState, useEffect } from 'react';
import {
  X,
  FolderSync,
  CheckCircle2,
  AlertCircle,
  Folder,
  FileText,
  Download,
  Info,
  RefreshCw,
  Github,
  Globe,
  ExternalLink
} from 'lucide-react';
import {
  fetchGitHubRepoFiles,
  DEFAULT_GITHUB_REPO,
  GitHubRepoConfig
} from '../services/githubDocumentSyncService';
import { ResourceItem, ResourceCategory } from '../types';
import { openAttachmentInExternalReader } from '../utils/documentHelper';

interface GitHubSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncResources: (syncedResources: ResourceItem[]) => void;
}

export const GitHubSyncModal: React.FC<GitHubSyncModalProps> = ({
  isOpen,
  onClose,
  onSyncResources
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [syncedCount, setSyncedCount] = useState<number | null>(null);
  const [repoFiles, setRepoFiles] = useState<ResourceItem[]>([]);
  const [repoConfig, setRepoConfig] = useState<GitHubRepoConfig>(DEFAULT_GITHUB_REPO);

  useEffect(() => {
    if (isOpen) {
      loadGitHubFiles(repoConfig);
    }
  }, [isOpen]);

  const loadGitHubFiles = async (config: GitHubRepoConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const files = await fetchGitHubRepoFiles(config);
      setRepoFiles(files);
      if (files.length > 0) {
        onSyncResources(files);
        setSyncedCount(files.length);
      }
    } catch (err: any) {
      console.error('Error loading GitHub repo files:', err);
      setError(err.message || 'Failed to sync with public GitHub repository.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSync = async () => {
    await loadGitHubFiles(repoConfig);
  };

  if (!isOpen) return null;

  const categoriesCount: Record<ResourceCategory, number> = {
    modules: repoFiles.filter((f) => f.category === 'modules').length,
    past_papers: repoFiles.filter((f) => f.category === 'past_papers').length,
    textbooks: repoFiles.filter((f) => f.category === 'textbooks').length,
    notes: repoFiles.filter((f) => f.category === 'notes').length,
    documents: repoFiles.filter((f) => f.category === 'documents').length
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-amber-500/10 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              <Github className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Public GitHub Document Repository Sync</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sync folders without signing in or entering a password
              </p>
            </div>
          </div>
            <div className="flex items-center space-x-2">
              <a
                href={`https://github.com/${repoConfig.owner}/${repoConfig.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
                title="View repository on GitHub"
              >
                <Globe className="h-3.5 w-3.5 text-teal-500" />
                <span className="hidden sm:inline">Open Repository</span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-3">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-white text-sm mb-1 flex items-center justify-between">
                  <span>Repository Target: {repoConfig.owner}/{repoConfig.repo}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-200 dark:bg-teal-900 text-teal-900 dark:text-teal-200">
                    Password-Free Active
                  </span>
                </p>
                <p>
                  Documents in public repository category folders (<strong className="text-teal-600 dark:text-teal-400">modules</strong>,{' '}
                  <strong className="text-teal-600 dark:text-teal-400">past_papers</strong>,{' '}
                  <strong className="text-teal-600 dark:text-teal-400">textbooks</strong>,{' '}
                  <strong className="text-teal-600 dark:text-teal-400">notes</strong>, and{' '}
                  <strong className="text-teal-600 dark:text-teal-400">documents</strong>) auto-sync without requiring login or password entry.
                </p>
                <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">
                  ⚡ No local storage caching: Files remain on GitHub until you click Download to save them on your device.
                </p>
              </div>
            </div>

            <div className="pt-1">
              <button
                onClick={handleManualSync}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Syncing Repository...' : 'Sync Public Repository Now'}</span>
              </button>
            </div>

            {syncedCount !== null && (
              <p className="text-xs text-emerald-800 dark:text-emerald-200 font-semibold bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 p-2.5 rounded-xl flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>✓ {syncedCount} file(s) synced from GitHub public repository!</span>
              </p>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Folder Breakdown */}
          {repoFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Synced Public Folders
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">Modules</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold">
                    {categoriesCount.modules}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold">Past Papers</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-bold">
                    {categoriesCount.past_papers}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-emerald-500" />
                    <span className="font-semibold">Textbooks</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold">
                    {categoriesCount.textbooks}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-amber-500" />
                    <span className="font-semibold">Notes</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 font-bold">
                    {categoriesCount.notes}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between col-span-2 sm:col-span-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="h-4 w-4 text-rose-500" />
                    <span className="font-semibold">Documents</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300 font-bold">
                    {categoriesCount.documents}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* List of Synced GitHub Files */}
          {repoFiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Synced Repository Files ({repoFiles.length})
              </h3>
              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {repoFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2 overflow-hidden mr-2">
                      <FileText className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
                      <span className="font-semibold truncate text-slate-900 dark:text-white">
                        {file.title}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] uppercase font-bold text-slate-600 dark:text-slate-300">
                        {file.category.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => openAttachmentInExternalReader(file)}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-teal-600 text-white font-bold text-[10px] hover:bg-teal-500 transition-colors cursor-pointer"
                        title="Download raw file directly from GitHub"
                      >
                        <Download className="h-3 w-3" />
                        <span>Download Original</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            {repoConfig.owner}/{repoConfig.repo}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
