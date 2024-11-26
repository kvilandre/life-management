import { Box, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
  ValueOptions,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useTitles } from "../titles/useTitles";
import React from "react";
import { useGetOrganizations } from "../organizations/useOrganization";
import {
  OrganizationOption,
  renderEditSingleOrganization,
  renderSingleOrganization,
} from "../organizations/organizationSingleColumn";
import { useSports } from "../sports/useSports";
import { SportOption } from "../sports/sportColumn";
import {
  renderEditSingleSport,
  renderSingleSport,
} from "../sports/sportSingleColumn";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  // const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    //   const id = randomId();
    //   setRows((oldRows) => [
    //     ...oldRows,
    //     { id, name: "", age: "", role: "", isNew: true },
    //   ]);
    //   setRowModesModel((oldModel) => ({
    //     ...oldModel,
    //     [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    //   }));
  };

  return (
    <GridToolbarContainer>
      <Typography>Titles</Typography>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Title() {
  const { data: titles = [], isLoading } = useTitles();
  const { data: organizations = [] } = useGetOrganizations();
  const { data: sports = [] } = useSports();

  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    //setRows(data.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    //     const editedRow = data.find((row) => row.id === id);
    //     if (editedRow!.isNew) {
    //       setRows(rows.filter((row) => row.id !== id));
    //     }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Title Name", width: 180, editable: true },
    { field: "abbreviation", headerName: "Abbr.", width: 180, editable: true },
    {
      field: "organization",
      headerName: "Organization",
      type: "singleSelect",
      valueOptions: { organizations },
      valueFormatter: (value: OrganizationOption) => value?.abbreviation,
      renderCell: renderSingleOrganization,
      renderEditCell: renderEditSingleOrganization,
      width: 150,
      editable: true,
    } as GridColDef<any, OrganizationOption, string>,
    {
      field: "sport",
      headerName: "Sport",
      type: "singleSelect",
      valueOptions: { sports },
      valueFormatter: (value: SportOption) => value?.name,
      renderCell: renderSingleSport,
      renderEditCell: renderEditSingleSport,
      width: 150,
      editable: true,
    } as GridColDef<any, SportOption, string>,
    { field: "isSuffix", headerName: "Is Suffix", width: 180, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={titles}
        getRowId={(row: any) => row.titleId}
        columns={columns}
        loading={isLoading}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={
          {
            //   toolbar: { setRows, setRowModesModel },
          }
        }
      />
    </Box>
  );
}
