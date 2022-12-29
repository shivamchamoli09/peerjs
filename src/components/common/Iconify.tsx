import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

interface PropsTypes {
    icon: any;
    sx?: object;
    width?: number;
    height?: number;
};

export default function Iconify({ icon, sx, width, height, ...other }: PropsTypes) {
    return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} width={width} height={height} />;
}
