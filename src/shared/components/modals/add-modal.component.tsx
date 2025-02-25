import { ChangeEvent, FC, useState, MouseEvent } from "react";
import { TextField, Typography, Divider, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { BasicModal } from "./basic-modal.component";
import { useTreeHandlersContext } from "../../core";

interface IAddModalProps {
  treeName: string;
  parentNodeId: number;
}

export const AddModal: FC<IAddModalProps> = ({ treeName, parentNodeId }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  const { createTreeNode } = useTreeHandlersContext();

  const handleModalOpenClick = (event: MouseEvent<SVGSVGElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    setIsOpened(true);
  };
  const handleModalCloseClick = (): void => setIsOpened(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  const handleCreateTreeNode = async (): Promise<void> => {
    setIsBtnSubmitting(true);
    await createTreeNode({
      treeName,
      parentNodeId,
      nodeName: inputValue,
    });
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
      </BasicModal>
    </>
  );
};
