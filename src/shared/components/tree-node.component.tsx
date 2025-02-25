import { FC, memo, useState } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { ITree } from "../core";
import { DeleteModal, AddModal, RenameModal } from "./modals";

interface ITreeNodeProps {
  name: string;
  nodeId: number;
  rootName: string;
  children: ITree[];
}

export const TreeNode: FC<ITreeNodeProps> = memo(
  ({ name, nodeId, rootName, children }) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpenClick = (): void => setIsOpened((_isOpened) => !_isOpened);

    return (
      <div style={{ marginLeft: 8 }}>
        <ListItemButton
          onClick={handleOpenClick}
          sx={{
            position: "relative",
            padding: "0 4px",
            width: "max-content",
            pointerEvents: "all",
            columnGap: "4px",
            ":hover": {
              cursor: "pointer",
            },
            marginLeft: 1,
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
          {isOpened && (
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
                <AddModal treeName={rootName} parentNodeId={nodeId} />
              </ListItemIcon>
              <ListItemIcon
                sx={{
                  ":hover": {
                    opacity: 0.8,
                  },
                  minWidth: "max-content",
                }}
              >
                <RenameModal treeName={rootName} nodeId={nodeId} name={name} />
              </ListItemIcon>
              <ListItemIcon
                sx={{
                  ":hover": {
                    opacity: 0.8,
                  },
                  minWidth: "max-content",
                }}
              >
                <DeleteModal treeName={rootName} nodeId={nodeId} />
              </ListItemIcon>
            </>
          )}
        </ListItemButton>
        {isOpened &&
          children.length > 0 &&
          children.map(({ name, children, id }) => (
            <TreeNode
              key={id}
              rootName={rootName}
              children={children}
              name={name}
              nodeId={id}
            />
          ))}
      </div>
    );
  }
);
