import { Container, Typography } from "@mui/material";
import { FC } from "react";

interface IErrorProps {
  message?: string;
}

export const Error: FC<IErrorProps> = ({
  message = "Something has gone wrong. Pleas reload a page",
}) => {
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
      <Typography color="error" variant="h3" component="h3">
        {message}
      </Typography>
    </Container>
  );
};
