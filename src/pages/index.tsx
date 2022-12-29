import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import StoryFeed from "../components/StoryFeed";
import ChannelList from "../components/RoomsList";
import Login from "../components/auth/login";
import { Post } from "@components";
import { Box, Grid } from "@mui/material";
import SpeedDial from "@components/atoms/SpeedDial";
import CreatePost from "@components/post/create_post";
import UserComments from "@components/post/user_comments";
import ActiveMembers from "@components/post/active_members";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect, useState } from "react";

const actions = [
  { icon: <AddToPhotosIcon />, key: "post", name: "Post" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
];

const Home: NextPage = () => {
  const [currentAction, setCurrentAction] = useState(null as any);

  useEffect(() => {
    console.log("currentAction******************", currentAction);
  }, [currentAction]);

  return (
    <>
      <Grid container position={"relative"} spacing={5} pt={3}>
        {currentAction === "post" && <CreatePost />}

        <Grid item xs={12} md={7}>
          <Post />
          <Post />
          <Post />
          <Post />
        </Grid>
        <Grid
          item
          xs={0}
          md={5}
          position="sticky"
          sx={{ top: "5vh" }}
          maxHeight={"90vh"}
        >
          {/* <CreatePost /> */}
          <UserComments />
          {/* <ActiveMembers /> */}

          <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
            <SpeedDial actions={actions} onActionClick={setCurrentAction} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
