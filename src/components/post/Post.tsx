import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { IPost } from "./types";

const Post: React.FC<IPost> = (props) => {
  return (
    <Card sx={{ maxWidth: "600px", ml: "auto", mb: 2 }}>
      <CardContent>
        <Box display={"flex"} alignItems="center">
          <Avatar sx={{ width: "30px", height: "30px" }} />
          <Typography variant="caption" pl={1} fontWeight={600}>
            r/shivam
          </Typography>
          <Typography variant="caption" sx={{ ml: "auto" }}>
            Posted by u/shivam
          </Typography>
        </Box>
        <Box id="post-content" pl={0.5} pt={1.25}>
          <Typography variant="h3" gutterBottom>
            Need some smartphone recommendations. Asking here because I think
            most of us here think quite alike.
          </Typography>

          <Typography variant="body1" pt={0}>
            I am switching from a one plus 5T, brought eons back. I am hoping I
            can buy a similar phone that can last just as long, or atleast 3
            years. Since one plus decided to settle, they are off the table, but
            I cannot decide among these other companies. The smartphone market
            changed quite drastically. Nokia came back, One plus is now trash,
            IQOO and Real Me and some other random companies popped up that I
            never heard of.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Post;
