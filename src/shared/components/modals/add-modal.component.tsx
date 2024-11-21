import { ChangeEvent, FC, useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BasicModal } from "./basic-modal.component";

interface IAddModalProps {
  onCreateTreeNode: (name: string) => Promise<void>;
}

export const AddModal: FC<IAddModalProps> = ({ onCreateTreeNode }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  const handleModalOpenClick = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpened(true);
  };
  const handleModalCloseClick = () => setIsOpened(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  const handleCreateTreeNode = async (): Promise<void> => {
    setIsBtnSubmitting(true);
    await onCreateTreeNode(inputValue);
    setIsBtnSubmitting(false);
    setIsOpened(false);
  };

  return (
    <>
      <AddIcon
        color="success"
        fontSize="small"
        onClick={handleModalOpenClick}
      />
      <BasicModal isOpened={isOpened} onModalCloseClick={handleModalCloseClick}>
        <>
          <Typography variant="h6" component="h2">
            Add new tree node
          </Typography>
          <Divider />
          <TextField
            id="tree-node-name"
            label="Input tree node name"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
          />
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
              onClick={handleCreateTreeNode}
              disabled={isBtnSubmitting || !inputValue}
            >
              Create
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
