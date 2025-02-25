import { FC, useState, MouseEvent } from "react";
import { Typography, Button, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { BasicModal } from "./basic-modal.component";
import { useTreeHandlersContext } from "../../core";

interface IDeleteModalProps {
  treeName: string;
  nodeId: number;
}

export const DeleteModal: FC<IDeleteModalProps> = ({ treeName, nodeId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);
  const { deleteTreeNode } = useTreeHandlersContext();

  const handleModalOpenClick = (event: MouseEvent<SVGSVGElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpened(true);
  };
  const handleModalCloseClick = (): void => setIsOpened(false);

  const handleDeleteTreeNode = async (): Promise<void> => {
    setIsBtnSubmitting(true);
    await deleteTreeNode({
      treeName,
      nodeId,
    });
    setIsBtnSubmitting(false);
    setIsOpened(false);
  };

  return (
    <>
      <DeleteIcon
        color="error"
        fontSize="small"
        onClick={handleModalOpenClick}
      />
      <BasicModal isOpened={isOpened} onModalCloseClick={handleModalCloseClick}>
        <>
          <Typography variant="h6" component="h2">
            Delete tree node
          </Typography>
          <Divider />
          <Typography variant="h6" component="h2">
            Do you really wanna delete this node?
          </Typography>
          <Divider />
          <div
            style={{
              display: "flex",
              columnGap: 10,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              onClick={handleDeleteTreeNode}
              disabled={isBtnSubmitting}
              color="error"
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={handleModalCloseClick}>
              Cancel
            </Button>
          </div>
        </>
      </BasicModal>
    </>
  );
};
