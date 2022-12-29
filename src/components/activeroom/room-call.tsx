import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import VideoPlayer from '../VideoPlayer';
import { sendToSocket, socket } from '../../core/services/socketio.service';
import { SOCKET_CONNECTIONS } from '../../core/constants/socket.constants';
import { getCurrentUserToken } from '../../core/services/user.service';
import { peersReducer } from '../../core/reducers/peerReducer';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RoomCall(props: any) {
    const { peers } = props;
    const [open, setOpen] = React.useState(false);


    React.useEffect(() => {
        if (props?.open) {
            setOpen(props.open);
        }
    }, [props?.open]);

    function handleClose() {

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Meeting
                    </Typography>
                    <Grid container >
                        {Object.values(peers)?.length > 0 && (
                            /** eslint disable */
                            Object.values(peers)?.map((stream: any, i: number) => {
                                return stream?.stream && (
                                    <Grid item md={4} sm={6} xs={12}>
                                        <VideoPlayer
                                            title={Object.keys(peers)[i]}
                                            stream={stream?.stream} />
                                    </Grid>
                                )
                            }
                            )
                        )}
                    </Grid>

                    <Button variant='contained' color='primary' onClick={() => { props?.onLeave() }}>Leave</Button>
                </Box>
            </Modal>
        </div>
    )
}