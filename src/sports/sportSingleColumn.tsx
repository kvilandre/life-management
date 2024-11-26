import * as React from "react";
import {
  GridRenderCellParams,
  GridRenderEditCellParams,
  useGridApiContext,
} from "@mui/x-data-grid";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import type { AutocompleteProps } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { useSports } from "./useSports";

export interface SportOption {
  sportId: number;
  name: string;
}

interface SportProps {
  value: SportOption;
}

// export const COUNTRY_ISO_OPTIONS: CountryIsoOption[] = [
//   { value: "DE", code: "DE", label: "Germany", phone: "49" },
//   { value: "ES", code: "ES", label: "Spain", phone: "34" },
//   { value: "FR", code: "FR", label: "France", phone: "33" },
//   { value: "GB", code: "GB", label: "United Kingdom", phone: "44" },
// ];

const SportColumn = React.memo(function SportColumn(props: SportProps) {
  const { value } = props;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        "&  > img": {
          mr: 0.5,
          flexShrink: 0,
          width: "20px",
        },
      }}
    >
      <Box
        component="span"
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
      >
        {value.name}
      </Box>
    </Box>
  );
});

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  height: "100%",
  [`& .${autocompleteClasses.inputRoot}`]: {
    ...theme.typography.body2,
    padding: "1px 0",
    height: "100%",
    "& input": {
      padding: "0 16px",
      height: "100%",
    },
  },
})) as typeof Autocomplete;

function EditSportColumn(props: GridRenderEditCellParams<SportOption>) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();
  const { data: sports = [] } = useSports();

  const handleChange = React.useCallback<
    NonNullable<AutocompleteProps<SportOption, false, true, false>["onChange"]>
  >(
    async (event, newValue) => {
      await apiRef.current.setEditCellValue(
        { id, field, value: newValue },
        event
      );
      apiRef.current.stopCellEditMode({ id, field });
    },
    [apiRef, field, id]
  );

  return (
    <StyledAutocomplete<SportOption, false, true, false>
      value={value}
      onChange={handleChange}
      options={sports}
      getOptionLabel={(option: any) => option.name}
      autoHighlight
      fullWidth
      open
      disableClearable
      renderOption={(optionProps, option: any) => (
        <Box
          component="li"
          sx={{
            "& > img": {
              mr: 1.5,
              flexShrink: 0,
            },
          }}
          {...optionProps}
          key={option.sportId}
        >
          {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <InputBase
          autoFocus
          fullWidth
          id={params.id}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
          {...params.InputProps}
        />
      )}
    />
  );
}

export function renderSingleSport(
  params: GridRenderCellParams<SportOption, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return <SportColumn value={params.value} />;
}

export function renderEditSingleSport(
  params: GridRenderEditCellParams<SportOption>
) {
  return <EditSportColumn {...params} />;
}
