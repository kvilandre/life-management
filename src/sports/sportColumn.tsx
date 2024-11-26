import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import {
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

export interface SportOption {
  sportId: number;
  name: string;
}

interface SportProps {
  value: Array<SportOption>;
}

const SportColumn = React.memo(function SportColumn(props: SportProps) {
  const { value } = props;

  return (
    <>
      {/* {value.map((organization: OrganizationOption) => (
          <MenuItem
            key={organization.organizationId}
            value={organization.abbreviation}
          >
            {organization.abbreviation}
          </MenuItem>
        ))} */}
      {/* <Stack gap={1} direction="row" flexWrap="wrap">
          {value.map((value) => (
            <Chip key={value.organizationId} label={value.abbreviation} />
          ))}
        </Stack> */}
      {value.map((value) => value.name).join(", ")}
    </>
  );
});

//   function EditOrganizationColumn(
//     props: GridRenderEditCellParams<OrganizationOption>
//   ) {
//     const { id, value, field } = props;

//     const apiRef = useGridApiContext();

//     const { data: organizations = [] } = useOrganizations();

//     const handleChange = React.useCallback<
//       NonNullable<
//         AutocompleteProps<OrganizationOption, true, true, false>["onChange"]
//       >
//     >(
//       async (event, newValue) => {
//         var whyMe = event;
//         await apiRef.current.setEditCellValue(
//           { id, field, value: newValue },
//           event
//         );
//         apiRef.current.stopCellEditMode({ id, field });
//       },
//       [apiRef, field, id]
//     );

//     return (
//       <Autocomplete
//         sx={{ m: 1, width: 500 }}
//         multiple
//         options={organizations}
//         getOptionLabel={(option) => option.abbreviation}
//         disableCloseOnSelect
//         value={value}
//         onChange={handleChange}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="outlined"
//             // label="Multiple Autocomplete"
//             // placeholder="Multiple Autocomplete"
//           />
//         )}
//         renderOption={(props, option, { selected }) => (
//           <MenuItem
//             {...props}
//             key={option.organizationId}
//             value={option.abbreviation}
//             sx={{ justifyContent: "space-between" }}
//           >
//             {option.abbreviation}
//             {selected ? <CheckIcon color="info" /> : null}
//           </MenuItem>
//         )}
//       />
//     );
//   }

export function renderSport(
  params: GridRenderCellParams<SportOption, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return <SportColumn value={params.value} />;
}

//   export function renderEditOrganization(
//     params: GridRenderEditCellParams<OrganizationOption>
//   ) {
//     return <EditOrganizationColumn {...params} />;
//   }
