import { FC, PropsWithChildren } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  display: "flex",
  flexDirection: "column",
  rowGap: "10px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 320,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

interface IBasicModalProps {
  isOpened: boolean;
  onModalCloseClick: () => void;
}

export const BasicModal: FC<PropsWithChildren<IBasicModalProps>> = ({
  isOpened,
  onModalCloseClick,
  children,
}) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Modal open={isOpened} onClose={onModalCloseClick}>
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
