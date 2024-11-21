import { FC, memo, useCallback, useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { useTreeHandlersContext } from "../core";
import { DeleteModal, AddModal, RenameModal } from "./modals";

interface ITreeNodeProps {
  isOpened: boolean;
  onOpenClick: (id: number) => void;
  name: string;
  nodeId: number;
  rootName: string;
}

export const TreeNode: FC<ITreeNodeProps> = memo(
  ({ onOpenClick, isOpened, name, nodeId, rootName }) => {
    const { createTreeNode, renameTreeNode, deleteTreeNode } =
      useTreeHandlersContext();

    const [isFocus, setIsFocus] = useState(false);

    const handleCreateTreeNode = useCallback(
      async (name: string) => {
        await createTreeNode({
          treeName: rootName,
          parentNodeId: nodeId,
          nodeName: name,
        });
      },
      [createTreeNode, nodeId, rootName]
    );

    const handleDeleteTreeNode = useCallback(async () => {
      await deleteTreeNode({
        treeName: rootName,
        nodeId: nodeId,
      });
    }, [deleteTreeNode, nodeId, rootName]);

    const handleRenameTreeNode = useCallback(
      async (newNodeName: string) => {
        await renameTreeNode({
          treeName: rootName,
          nodeId: nodeId,
          newNodeName,
        });
      },
      [renameTreeNode, nodeId, rootName]
    );

    const handleOpenClick = () => onOpenClick(nodeId);

    const handleBlur = (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      setIsFocus(false);
    };
    const handleFocus = (event: React.MouseEvent) => {
      event.stopPropagation();
      event.preventDefault();
      setIsFocus(true);
    };

    const isShownBtns = name !== rootName && isFocus;

    return (
      <ListItemButton
        onClick={handleOpenClick}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        sx={{
          position: "relative",
          padding: "0",
          width: "max-content",
          pointerEvents: "all",
          columnGap: "4px",
          ":hover": {
            cursor: "pointer",
          },
        }}
      >
        <ListItemIcon sx={{ minWidth: "max-content" }}>
          {isOpened ? (
            <FolderOpenIcon fontSize="small" />
          ) : (
            <FolderIcon fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary={name} />
        {isShownBtns && (
          <>
            <ListItemIcon
              sx={{
                ":hover": {
                  opacity: 0.8,
                },
                paddingLeft: "4px",
                minWidth: "max-content",
              }}
            >
              <AddModal onCreateTreeNode={handleCreateTreeNode} />
            </ListItemIcon>
            <ListItemIcon
              sx={{
                ":hover": {
                  opacity: 0.8,
                },
                minWidth: "max-content",
              }}
            >
              <RenameModal
                onRenameTreeNode={handleRenameTreeNode}
                name={name}
              />
            </ListItemIcon>
            <ListItemIcon
              sx={{
                ":hover": {
                  opacity: 0.8,
                },
                minWidth: "max-content",
              }}
            >
              <DeleteModal onDeleteTreeNode={handleDeleteTreeNode} />
            </ListItemIcon>
          </>
        )}
      </ListItemButton>
    );
  }
);
