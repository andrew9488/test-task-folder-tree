import { FC, memo, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

import { ITree } from "../core";
import { TreeNode } from "./tree-node.component";
import { AddModal } from "./modals";

interface ITreeProps {
  tree: ITree;
}

export const Tree: FC<ITreeProps> = memo(({ tree }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenClick = (): void => setIsOpened((_isOpened) => !_isOpened);

  return (
    <List sx={{ width: "100%", marginLeft: 0 }}>
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
        }}
      >
        <ListItemIcon sx={{ minWidth: "max-content" }}>
          {isOpened ? (
            <FolderOpenIcon fontSize="small" />
          ) : (
            <FolderIcon fontSize="small" />
          )}
        </ListItemIcon>
        <ListItemText primary={tree.name} />
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
              <AddModal treeName={tree.name} parentNodeId={tree.id} />
            </ListItemIcon>
          </>
        )}
      </ListItemButton>
      {isOpened &&
        tree.children.length > 0 &&
        tree.children.map(({ name, children, id }) => (
          <TreeNode
            key={id}
            rootName={tree.name}
            children={children}
            name={name}
            nodeId={id}
          />
        ))}
    </List>
  );
});
