import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ITree } from "../interfaces";
import {
  ICreateTreeNodePayload,
  IDeleteTreeNodePayload,
  IRenameTreeNodePayload,
  TreeNodeApiService,
  TreeService,
} from "../services";
import { getErrorMessage, getTreeNameFromSS } from "../helpers";

interface ITreeContextData {
  tree: ITree | null;
  isLoading: boolean;
  error: Error | null;
  actionError: string | null;
}

interface ITreeContextHandlers {
  createTreeNode: (args: ICreateTreeNodePayload) => Promise<void>;
  deleteTreeNode: (args: IDeleteTreeNodePayload) => Promise<void>;
  renameTreeNode: (args: IRenameTreeNodePayload) => Promise<void>;
  getTree: (treeName: string) => Promise<void>;
}

const TreeContextData = createContext<ITreeContextData>({
  tree: null,
  isLoading: true,
  error: null,
  actionError: null,
});

const TreeContextHandlers = createContext<ITreeContextHandlers>({
  createTreeNode: async () => {},
  deleteTreeNode: async () => {},
  renameTreeNode: async () => {},
  getTree: async () => {},
});

export const TreeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tree, setTree] = useState<ITree | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (actionError) {
      const id = setTimeout(() => {
        setActionError(null);
      }, 3000);
      return () => clearTimeout(id);
    }
  }, [actionError]);

  const getTree = useCallback(async (treeName: string): Promise<void> => {
    const response = await TreeService.getTree(treeName);
    setTree(response);
  }, []);

  const createTreeNode = useCallback(
    async (args: ICreateTreeNodePayload): Promise<void> => {
      setActionError(null);
      try {
        await TreeNodeApiService.createTreeNode(args);
        await getTree(args.treeName);
      } catch (error) {
        setActionError(getErrorMessage(error));
      }
    },
    [getTree]
  );

  const deleteTreeNode = useCallback(
    async (args: IDeleteTreeNodePayload) => {
      setActionError(null);
      try {
        await TreeNodeApiService.deleteTreeNode(args);
        await getTree(args.treeName);
      } catch (error) {
        setActionError(getErrorMessage(error));
      }
    },
    [getTree]
  );

  const renameTreeNode = useCallback(
    async (args: IRenameTreeNodePayload) => {
      setActionError(null);
      try {
        await TreeNodeApiService.renameTreeNode(args);
        await getTree(args.treeName);
      } catch (error) {
        setActionError(getErrorMessage(error));
      }
    },
    [getTree]
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setTree(null);
      setError(null);
      const treeName = getTreeNameFromSS();
      if (!treeName) {
        setIsLoading(false);
        setTree(null);
        return;
      }
      try {
        await getTree(treeName);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getTree]);

  const data = useMemo(
    () => ({
      tree,
      isLoading,
      error,
      actionError,
    }),
    [tree, isLoading, error, actionError]
  );

  const handlers = useMemo(
    () => ({
      createTreeNode,
      renameTreeNode,
      deleteTreeNode,
      getTree,
    }),
    [createTreeNode, deleteTreeNode, renameTreeNode, getTree]
  );
  return (
    <TreeContextData.Provider value={data}>
      <TreeContextHandlers.Provider value={handlers}>
        {children}
      </TreeContextHandlers.Provider>
    </TreeContextData.Provider>
  );
};

export const useTreeDataContext = () => {
  const context = useContext(TreeContextData);
  return useMemo(() => context, [context]);
};

export const useTreeHandlersContext = () => {
  const context = useContext(TreeContextHandlers);
  return useMemo(() => context, [context]);
};
