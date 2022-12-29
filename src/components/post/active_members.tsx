import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const Member = () => {
  return (
    <Grid xs={2} sx={{ textAlign: "center", mt: 1 }}>
      <Avatar sx={{ width: "26px", height: "26px", m: "auto" }} />
      <Typography variant="body2" pl={1}>
        Shivam
      </Typography>
    </Grid>
  );
};

const ActiveMembers: React.FC<any> = (props) => {
  return (
    <Card sx={{ maxHeight: "400px", overflowY: "scroll", mt: 3 }}>
      <CardContent>
        <Typography variant="h3">Active Members</Typography>
        <Grid container>
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
          <Member />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ActiveMembers;
