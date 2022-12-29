import * as React from "react";
import Box from "@mui/material/Box";
import BasicSpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { AddIcCallOutlined } from "@mui/icons-material";

export default function SpeedDial({
  actions,
  onActionClick,
}: {
  actions: any;
  onActionClick: (key: string) => void;
}) {
  const handleAction = (key: string) => {
    onActionClick(key);
  };
  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <BasicSpeedDial
        ariaLabel="speedDial"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action: any) => (
          <SpeedDialAction
            key={action.key}
            onClick={() => handleAction(action?.key)}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </BasicSpeedDial>
    </Box>
  );
}
