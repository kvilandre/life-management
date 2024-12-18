import * as React from "react";
import Chip from "@mui/material/Chip";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import type { MenuProps } from "@mui/material/Menu";
import Select, { SelectProps } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import InfoIcon from "@mui/icons-material/Info";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DoneIcon from "@mui/icons-material/Done";
import {
  GridEditModes,
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiContext,
  useGridRootProps,
} from "@mui/x-data-grid";

export const STATUS_OPTIONS = ["Open", "PartiallyFilled", "Filled", "Rejected"];

interface StatusProps {
  status: string;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: "left",
  "& .icon": {
    color: "inherit",
  },
  "&.Open": {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
  "&.Filled": {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  "&.PartiallyFilled": {
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  "&.Rejected": {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
}));

const Status = React.memo((props: StatusProps) => {
  const { status } = props;

  let icon: any = null;
  if (status === "Rejected") {
    icon = <ReportProblemIcon className="icon" />;
  } else if (status === "Open") {
    icon = <InfoIcon className="icon" />;
  } else if (status === "PartiallyFilled") {
    icon = <AutorenewIcon className="icon" />;
  } else if (status === "Filled") {
    icon = <DoneIcon className="icon" />;
  }

  let label: string = status;
  if (status === "PartiallyFilled") {
    label = "Partially Filled";
  }

  return (
    <StyledChip
      className={status}
      icon={icon}
      size="small"
      label={label}
      variant="outlined"
    />
  );
});

function EditStatus(props: GridRenderEditCellParams<any, string>) {
  const { id, value, field } = props;
  const rootProps = useGridRootProps();
  const apiRef = useGridApiContext();

  const handleChange: SelectProps["onChange"] = async (event) => {
    const isValid = await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });

    if (isValid && rootProps.editMode === GridEditModes.Cell) {
      apiRef.current.stopCellEditMode({ id, field, cellToFocusAfter: "below" });
    }
  };

  const handleClose: MenuProps["onClose"] = (event, reason) => {
    if (reason === "backdropClick") {
      apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
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
      {STATUS_OPTIONS.map((option) => {
        let IconComponent: any = null;
        if (option === "Rejected") {
          IconComponent = ReportProblemIcon;
        } else if (option === "Open") {
          IconComponent = InfoIcon;
        } else if (option === "PartiallyFilled") {
          IconComponent = AutorenewIcon;
        } else if (option === "Filled") {
          IconComponent = DoneIcon;
        }

        let label = option;
        if (option === "PartiallyFilled") {
          label = "Partially Filled";
        }

        return (
          <MenuItem key={option} value={option}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <IconComponent fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={label} sx={{ overflow: "hidden" }} />
          </MenuItem>
        );
      })}
    </Select>
  );
}

export function renderStatus(params: GridRenderCellParams<any, string>) {
  if (params.value == null) {
    return "";
  }

  return <Status status={params.value} />;
}

export function renderEditStatus(
  params: GridRenderEditCellParams<any, string>
) {
  return <EditStatus {...params} />;
}
