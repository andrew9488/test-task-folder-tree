import { FC, useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { BasicModal } from "./basic-modal.component";

interface IDeleteModalProps {
  onDeleteTreeNode: () => Promise<void>;
}

export const DeleteModal: FC<IDeleteModalProps> = ({ onDeleteTreeNode }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  const handleModalOpenClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpened(true);
  };
  const handleModalCloseClick = () => setIsOpened(false);

  const handleDeleteTreeNode = async (): Promise<void> => {
    setIsBtnSubmitting(true);
    await onDeleteTreeNode();
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
