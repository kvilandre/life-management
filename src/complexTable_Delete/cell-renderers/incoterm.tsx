import * as React from "react";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import type { MenuProps } from "@mui/material/Menu";
import Select, { SelectProps } from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import {
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";

export const INCOTERM_OPTIONS = [
  "EXW (Ex Works)",
  "FAS (Free Alongside Ship)",
  "FCA (Free Carrier)",
  "CPT (Carriage Paid To)",
  "DAP (Delivered at Place)",
  "DPU (Delivered at Place Unloaded)",
  "DDP (Delivered Duty Paid)",
];

interface IncotermProps {
  value: string | null | undefined;
}

const Incoterm = React.memo(function Incoterm(props: IncotermProps) {
  const { value } = props;

  if (!value) {
    return null;
  }

  const valueStr = value.toString();
  const tooltip = valueStr.slice(
    valueStr.indexOf("(") + 1,
    valueStr.indexOf(")")
  );
  const code = valueStr.slice(0, valueStr.indexOf("(")).trim();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span>{code}</span>
      <Tooltip title={tooltip}>
        <InfoIcon sx={{ color: "#2196f3", alignSelf: "center", ml: "8px" }} />
      </Tooltip>
    </Box>
  );
});

function EditIncoterm(props: GridRenderEditCellParams<any, string | null>) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();

  const handleChange: SelectProps["onChange"] = async (event) => {
    await apiRef.current.setEditCellValue(
      { id, field, value: event.target.value as any },
      event
    );
    apiRef.current.stopCellEditMode({ id, field });
  };

  const handleClose: MenuProps["onClose"] = (event, reason) => {
    if (reason === "backdropClick") {
      apiRef.current.stopCellEditMode({ id, field });
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      MenuProps={{
        onClose: handleClose,
      }}
      sx={{
        height: "100%",
        "& .MuiSelect-select": {
          display: "flex",
          alignItems: "center",
          pl: 1,
        },
      }}
      autoFocus
      fullWidth
      open
    >
      {INCOTERM_OPTIONS.map((option) => {
        const tooltip = option.slice(
          option.indexOf("(") + 1,
          option.indexOf(")")
        );
        const code = option.slice(0, option.indexOf("(")).trim();

        return (
          <MenuItem key={option} value={option}>
            <ListItemIcon sx={{ minWidth: 36 }}>{code}</ListItemIcon>
            <ListItemText primary={tooltip} sx={{ overflow: "hidden" }} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderIncoterm(
  params: GridRenderCellParams<any, string | null, any>
) {
  return <Incoterm value={params.value} />;
}

export function renderEditIncoterm(
  params: GridRenderEditCellParams<any, string | null>
) {
  return <EditIncoterm {...params} />;
}
