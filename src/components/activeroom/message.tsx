import { Box, Card, CardContent, Divider, Typography } from "@mui/material";


export default function MessageComponent({ username, align, message, type }: any) {
    return <Box mt={2} mb={2}>
        <Card variant="elevation" sx={{ maxWidth: '70%', ml: align === 'right' ? "auto" : "", marginRight: '10px' }}>
            <CardContent style={{ padding: "1rem" }}>
                <Box>
                    <Typography mb={1} variant="body2">
                        {username}
                    </Typography>
                    <Divider />
                    <Typography mt={2} variant="body1">
                        {message}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    </Box>
}