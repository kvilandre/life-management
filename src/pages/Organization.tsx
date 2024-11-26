import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { useSports } from "../sports/useSports";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import React, { ReactNode } from "react";
import { useGetOrganizations } from "../organizations/useOrganization";
import {
  OrganizationOption,
  renderEditOrganization,
  renderOrganization,
} from "../organizations/organizationColumn";
import { renderSport, SportOption } from "../sports/sportColumn";
import {
  CreateOrganization,
  DeleteOrganization,
} from "../organizations/organizationApi";
import { toast } from "react-toastify";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";

const initialRows: GridRowsProp = [
  {
    organizationId: -1,
    abbreviation: "",
    name: "",
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    if (window.confirm("Are you sure you want to add a new organization?")) {
      CreateOrganization()
        .then((res) => {
          //var id = res;
          const id = res.organizationId;
          setRows((oldRows) => [
            ...oldRows,
            { id, abbreviation: res.abbreviation, name: res.name },
          ]);
          setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: "abbreviation" },
          }));
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err.response.data);
            toast.error(err.response.data);
          }
        });
    }
    // const id = randomId();
    // setRows((oldRows) => [
    //   ...oldRows,
    //   { id, abbreviation: "", name: "", isNew: true },
    // ]);
    // setRowModesModel((oldModel) => ({
    //   ...oldModel,
    //   [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    // }));
  };

  return (
    <GridToolbarContainer>
      <Typography>Organizations</Typography>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Organization() {
  const { data: organizations = [], isLoading } = useGetOrganizations();

  const [rows, setRows] = React.useState(initialRows);
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
    if (window.confirm("Are you sure you want to delete?")) {
      DeleteOrganization(Number(id))
        .then((res) => {
          toast.error(`Trial is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log(err.response.data);
            toast.error(err.response.data);
          }
        });
    }
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "abbreviation", headerName: "Abbr.", width: 180, editable: true },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "sports",
      headerName: "Sports",
      //   valueFormatter: ,
      renderCell: renderSport,
      align: "left",
      headerAlign: "left",
      editable: false,
      width: 200,
    } as GridColDef<any, SportOption, string>,
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
        rows={organizations}
        getRowId={(row: any) => row.organizationId}
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
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
