import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ActiveUsersList({ users }: any) {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem sx={{ display: 'block' }}>
                {users?.map((user: any) => (
                    <>
                        <ListItemText sx={{ width: '100%', mt: 2 }} primary={user?.name} secondary="Jan 9, 2014" />
                        <Divider />
                    </>
                ))}
            </ListItem>
        </List>
    )
}