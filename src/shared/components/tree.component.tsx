import { FC, memo, useCallback, useState } from "react";
import { Collapse, List } from "@mui/material";

import { ITree } from "../core";
import { TreeNode } from "./tree-node.component";

interface ITreeProps {
  tree: ITree;
  rootName: string;
  withPadding?: boolean;
}

export const Tree: FC<ITreeProps> = memo(
  ({ tree, rootName, withPadding = false }) => {
    const [isOpened, setIsOpened] = useState<Record<string, boolean>>({});

    const handleOpenClick = useCallback((id: string) => {
      setIsOpened((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    }, []);

    return (
      <List
        sx={{ width: "100%", padding: "0", marginLeft: withPadding ? 1 : 0 }}
        component="ul"
      >
        <TreeNode
          nodeId={tree.id}
          name={tree.name}
          isOpened={!!isOpened[tree.id]}
          rootName={rootName}
          onOpenClick={handleOpenClick}
        />
        {tree.children.map((treeNode) => (
            <Collapse
              in={!!isOpened[tree.id]}
              timeout="auto"
              unmountOnExit
              key={treeNode.id}
            >
              <Tree tree={treeNode} rootName={rootName} withPadding />
            </Collapse>
          ))
        }
      </List>
    );
  }
);
