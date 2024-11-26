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
import { useGetOrganizations } from "./useOrganization";

export interface OrganizationOption {
  organizationId: number;
  abbreviation: string;
  name: string;
}

interface OrganizationProps {
  value: OrganizationOption;
}

// export const COUNTRY_ISO_OPTIONS: CountryIsoOption[] = [
//   { value: "DE", code: "DE", label: "Germany", phone: "49" },
//   { value: "ES", code: "ES", label: "Spain", phone: "34" },
//   { value: "FR", code: "FR", label: "France", phone: "33" },
//   { value: "GB", code: "GB", label: "United Kingdom", phone: "44" },
// ];

const OrganizationColumn = React.memo(function OrganizationColumn(
  props: OrganizationProps
) {
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
        {value.abbreviation}
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

function EditOrganizationColumn(
  props: GridRenderEditCellParams<OrganizationOption>
) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();
  const { data: organizations = [] } = useGetOrganizations();

  const handleChange = React.useCallback<
    NonNullable<
      AutocompleteProps<OrganizationOption, false, true, false>["onChange"]
    >
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
    <StyledAutocomplete<OrganizationOption, false, true, false>
      value={value}
      onChange={handleChange}
      options={organizations}
      getOptionLabel={(option: any) => option.abbreviation}
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
          key={option.organizationId}
        >
          {option.abbreviation}
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

export function renderSingleOrganization(
  params: GridRenderCellParams<OrganizationOption, any, any>
) {
  if (params.value == null) {
    return "";
  }

  return <OrganizationColumn value={params.value} />;
}

export function renderEditSingleOrganization(
  params: GridRenderEditCellParams<OrganizationOption>
) {
  return <EditOrganizationColumn {...params} />;
}
