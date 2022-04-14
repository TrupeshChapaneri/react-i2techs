import { Container } from "@material-ui/core";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { AddPost } from "./AddPost";

function Header() {
  const [addPost, setAddPost] = React.useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Container className="container-main-width">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                All Post
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={() => setAddPost(true)}
              >
                Add
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      {addPost && <AddPost open={addPost} setOpen={setAddPost} />}
    </>
  );
}

export { Header };
