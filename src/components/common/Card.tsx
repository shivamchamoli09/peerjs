import { Box, Button, Card, CardContent, Divider, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import RocketIcon from '@mui/icons-material/Rocket';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function CardComponent(props: any) {
    const theme = useTheme();
    return <Card variant="outlined" sx={{ borderWidth: '2px' }}>
        <CardContent style={{ padding: "0" }}>
            {props?.image && (
                <Image src={props?.image} alt="Story" width={500} height={300} />
            )}
            <Box sx={{ padding: "1rem" }}>
                <Box sx={{ display: 'flex' }}>
                    <Typography variant="h5">
                        {props?.title}
                    </Typography>
                    {props?.subDescription && (
                        <Box ml="auto">
                            <Typography variant="caption"
                                sx={{ color: 'white', padding: '5px', borderRadius: '5px' }}>{props?.subDescription}
                            </Typography>
                            <RocketLaunchIcon />
                        </Box>
                    )}
                </Box>
                <Typography variant="body1">
                    {props?.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" color="primary"
                        onClick={() => {
                            props?.onButtonClick(props?.id)
                        }}>
                        {props?.buttonText}
                    </Button>
                </Box>
            </Box>
        </CardContent>
    </Card>
}