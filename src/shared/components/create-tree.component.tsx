import { ChangeEvent, FC, useState } from "react";
import { Button, CircularProgress, Paper, TextField } from "@mui/material";

import { setTreeNameToSS, useTreeHandlersContext } from "../core";

export const CreateTree: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isBtnSubmitting, setIsBtnSubmitting] = useState(false);
  const { getTree } = useTreeHandlersContext();

  const handleCreateTreeClick = async (): Promise<void> => {
    setIsBtnSubmitting(true);
    await getTree(inputValue);
    setTreeNameToSS(inputValue);
    setIsBtnSubmitting(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <Paper
      component="section"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        p: 2,
        rowGap: 2,
      }}
    >
      <TextField
        id="tree-name"
        label="Input tree name"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button
        variant="contained"
        onClick={handleCreateTreeClick}
        disabled={isBtnSubmitting}
      >
        {isBtnSubmitting ? <CircularProgress /> : "Create Tree"}
      </Button>
    </Paper>
  );
};
