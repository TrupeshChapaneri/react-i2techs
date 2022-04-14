import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, Collapse, FormGroup } from "@mui/material";
import { callApi } from "../apiHelpers/ApiHelper";
import { getComments, addComment } from "../apiHelpers/Url";
import { List, TextField } from "@material-ui/core";
import { GlobalContext } from "../context/GlobalContext";
import { CommentList } from "./CommentList";

function PostCard(props) {
  const { id, user_id, title, body, expandedId, setExpandedId } = props;
  const { globalState, setGlobalState } = useContext(GlobalContext);

  const [commentText, setCommentText] = useState("");

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>{body}</Typography>
        </CardContent>
        <CardActions
          disableSpacing
          className="comment-show-btn"
          onClick={() => {
            setExpandedId(expandedId === id ? null : id);

            if (!(expandedId === id)) {
              callApi({
                url: getComments(user_id),
                onSuccess: (payload) => {
                  setGlobalState((prv) => ({ ...prv, postComment: payload }));
                },
              });
            }
          }}
        >
          {expandedId === id ? "Hide Comment" : "Show Comment"}
        </CardActions>
        <Collapse in={expandedId === id} timeout="auto" unmountOnExit>
          <List>
            {globalState.postComment.map(({ name, email, body }, id) => (
              <CommentList key={id} {...{ name, email, body }} />
            ))}
          </List>
          <FormGroup className="comment-input">
            <TextField
              minRows={2}
              variant="filled"
              multiline
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              label="Enter Comment"
              placeholder="Enter Comment"
            />
            <Button
              disabled={commentText.length === 0}
              variant="contained"
              onClick={() => {
                // here Using Hard Coded email nad name Becuse I did't get it API doc.
                const data = {
                  body: commentText,
                  email: "hello@gmai.com",
                  name: "Test User",
                };
                callApi({
                  url: addComment(user_id),
                  postData: data,
                  onSuccess: (payload) => {
                    setGlobalState((prv) => ({
                      ...prv,
                      postComment: [payload, ...prv.postComment],
                    }));
                    setCommentText("");
                  },
                });
              }}
            >
              Add Comment
            </Button>
          </FormGroup>
        </Collapse>
      </Card>
    </Grid>
  );
}

export { PostCard };
