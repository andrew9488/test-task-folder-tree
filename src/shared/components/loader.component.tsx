import { FC } from "react";
import { CircularProgress, Container } from "@mui/material";

export const Loader: FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
        m: "0 auto",
      }}
    >
      <CircularProgress size={64} />
    </Container>
  );
};
