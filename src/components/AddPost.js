import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { callApi } from "../apiHelpers/ApiHelper";
import { addPost } from "../apiHelpers/Url";
import { removeDoubleQuotes } from "../AppUtils";
import { GlobalContext } from "../context/GlobalContext";

function AddPost({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const { setGlobalState } = useContext(GlobalContext);

  const { handleSubmit, errors, control } = useForm({
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(
      Joi.object({
        title: Joi.string().trim().required().min(5).label("Title"),
        body: Joi.string().trim().required().min(10).label("Post"),
      })
    ),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const submitForm = (submitdata) => {
    callApi({
      url: addPost(),
      postData: submitdata,
      onSuccess: () => {
        setGlobalState((prv) => ({
          ...prv,
          postList: [submitdata, ...prv.postList],
        }));
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      className="post-modal"
      onClose={() => setOpen(false)}
      open={open}
    >
      <MuiDialogTitle disableTypography>
        <Typography variant="h6">Add Post</Typography>
      </MuiDialogTitle>
      <DialogContent dividers>
        <FormGroup>
          <Controller
            control={control}
            name="title"
            render={({ onChange, value, onBlur }) => (
              <TextField
                label="Enter Title"
                required
                multiline
                fullWidth
                onBlur={onBlur}
                error={errors.title}
                variant="outlined"
                helperText={
                  errors.title && removeDoubleQuotes(errors.title.message)
                }
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="body"
            render={({ onChange, value, onBlur }) => (
              <TextField
                label="Enter Post"
                required
                fullWidth
                multiline
                minRows={6}
                onBlur={onBlur}
                error={errors.body}
                variant="outlined"
                helperText={
                  errors.body && removeDoubleQuotes(errors.body.message)
                }
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          className="ml-2"
          variant="contained"
          autoFocus
          onClick={handleSubmit(submitForm)}
          color="primary"
        >
          Add Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { AddPost };
