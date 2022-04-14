/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { callApi } from "../apiHelpers/ApiHelper";
import { GlobalContext } from "../context/GlobalContext";
import { PostCard } from "./PostCard";
import { postList } from "../apiHelpers/Url";

function PostList() {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [expandedId, setExpandedId] = React.useState(null);

  useEffect(() => {
    callApi({
      url: postList(),
      onSuccess: (payload) => {
        setGlobalState((prv) => ({ ...prv, postList: payload }));
      },
    });
  }, []);

  return (
    <Container className="container-main">
      <Grid container spacing={4}>
        {globalState.postList.map(({ id, user_id, title, body }) => (
          <PostCard
            key={id}
            {...{ id, user_id, title, body, expandedId, setExpandedId }}
          />
        ))}
      </Grid>
    </Container>
  );
}

export { PostList };
