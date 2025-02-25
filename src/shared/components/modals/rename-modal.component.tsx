import { ChangeEvent, FC, useState, MouseEvent } from "react";
import { TextField, Typography, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { BasicModal } from "./basic-modal.component";
import { useTreeHandlersContext } from "../../core";

interface IRenameModalProps {
  treeName: string;
  nodeId: number;
  name: string;
}

export const RenameModal: FC<IRenameModalProps> = ({
  nodeId,
  treeName,
  name,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [inputValue, setInputValue] = useState(name);
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);

  const { renameTreeNode } = useTreeHandlersContext();

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
    await renameTreeNode({
      treeName,
      nodeId,
      newNodeName: inputValue,
    });
    setIsBtnSubmitting(false);
    setIsOpened(false);
  };

  return (
    <>
      <EditIcon
        color="primary"
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
            disabled={isBtnSubmitting || !inputValue || name === inputValue}
          >
            Rename
          </Button>
          <Button variant="outlined" onClick={handleModalCloseClick}>
            Cancel
          </Button>
        </div>
      </BasicModal>
    </>
  );
};
