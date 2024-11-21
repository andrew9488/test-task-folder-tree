import { FC } from "react";
import { Alert, Container, Snackbar } from "@mui/material";

import { CreateTree, Loader, Error, Tree, useTreeDataContext } from "./shared";

export const App: FC = () => {
  const { isLoading, error, tree, actionError } = useTreeDataContext();

  if (isLoading) return <Loader />;

  if (error) return <Error />;

  return (
    <Container
      sx={{
        position: "relative",
        minHeight: "100dvh",
        m: "0 auto",
      }}
    >
      <>
        {tree ? <Tree tree={tree} rootName={tree.name} /> : <CreateTree />}
        <Snackbar
          open={!!actionError}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert variant="filled" severity="error">
            {actionError}
          </Alert>
        </Snackbar>
      </>
    </Container>
  );
};
