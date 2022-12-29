import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, TextField, useTheme, ButtonGroup } from "@mui/material";
import { apiRequest } from "../../core/services/http.service";
import { LoaderContext } from "../../core/context/loader.context";

export default function CreateRoom(props: any) {
  const theme = useTheme();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: theme?.palette?.background?.default,
    border: "2px solid inherit",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const fields = [
    {
      id: "name",
      label: "Name",
      name: "name",
      type: "text",
    },
    {
      id: "description",
      label: "Description",
      name: "description",
      type: "text",
    },
  ];
  const [form, setForm] = React.useState({
    name: "",
    description: "",
  }) as any;
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function createRoom() {
    const res = await apiRequest("/rooms", "POST", form);
    return window?.location?.replace(`/rooms/${res.data._id}`);
  }

  function handleCancel() {
    setOpen(false);
    props?.onClose();
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" textAlign={"center"}>
            Create your room
          </Typography>
          <Box mt={5}>
            <Grid container spacing={4}>
              {fields.map((field: any, i: number) => (
                <Grid item xs={12} key={i}>
                  <TextField
                    id={field?.id}
                    fullWidth
                    label={field?.label}
                    value={form[field?.name]}
                    name={field?.name}
                    onChange={(e) =>
                      setForm({ ...form, [field?.name]: e.target.value })
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={6}>
                <Button
                  fullWidth
                  sx={{ float: "right", color: "white" }}
                  variant="outlined"
                  color="primary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  sx={{ float: "right" }}
                  variant="contained"
                  color="primary"
                  onClick={createRoom}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
