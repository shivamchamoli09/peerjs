import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { IUserComments } from "./types";

const UserComment: React.FC<any> = () => {
  return (
    <>
      <Box display={"flex"} alignItems="center" mt={2}>
        <Avatar sx={{ width: "26px", height: "26px" }} />
        <Typography variant="body2" pl={1}>
          Shivam
        </Typography>
      </Box>
      <Typography variant="subtitle2" pt={1} pl={1}>
        Posted by u/shivam Posted by u/shivam Posted by u/shivam Posted by
        u/shivam Posted by u/shivam Posted by u/shivam Posted by u/shivam Posted
        by u/shivam
      </Typography>
      <Typography variant="caption" sx={{ float: "right" }}>
        2022-06-22 14:22
      </Typography>
    </>
  );
};

const UserComments: React.FC<IUserComments> = (props) => {
  return (
    <>
      <Card sx={{ maxHeight: "400px", overflowY: "scroll" }}>
        <CardContent>
          <Typography variant="h3">User Comments</Typography>
          <UserComment />
          {/* <Divider sx={{ mt: 1 }} /> */}
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <Box sx={{ position: "sticky", bottom: 0, display: "flex" }}>
            <TextField
              placeholder="Add Comment"
              fullWidth
              // variant="standard"
              // inputProps={(style = {})}
            />
            <Button variant="contained">Sent</Button>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default UserComments;
