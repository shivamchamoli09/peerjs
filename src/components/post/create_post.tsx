import { ICreatePost } from "./types";
import React from "react";
import { Box, Modal, TextareaAutosize, Fab } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  // top: "50%",
  right: "0",
  // transform: "translate(-50%, -50%)",
  width: 400,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "10px",
};

const CreatePost: React.FC<ICreatePost> = (props) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal
        aria-labelledby="create-post-label"
        aria-describedby="create-post"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        // sx={{ background: "#fff" }}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ position: "absolute", bottom: 20, width: "100%" }}>
              <TextareaAutosize
                minRows={5}
                maxRows={5}
                style={{
                  width: "95%",
                  borderRadius: "5px",
                  padding: "10px",
                  fontSize: "18px",
                }}
              />
              <TextareaAutosize
                minRows={22}
                maxRows={22}
                style={{
                  width: "95%",
                  borderRadius: "5px",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
              <Button
                variant="contained"
                sx={{ float: "right", right: "20px" }}
              >
                Post
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CreatePost;
