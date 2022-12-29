import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";

function StoryComponent() {
    return <>
        <Card>
            <CardContent style={{ padding: "10px" }}>
                <Typography variant="h6" style={{ padding: "0px" }}>
                    This is my story. Let everyone know about it.
                </Typography>
            </CardContent>
        </Card>
    </>
}


export default function StoryFeed() {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item md={6} sm={12} xs={12}>
                    <Card variant="outlined">
                        <CardContent style={{ padding: "1rem" }}>
                            <StoryComponent />
                            <StoryComponent />
                            <StoryComponent />
                            <StoryComponent />
                            <StoryComponent />
                            <StoryComponent />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}