import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { Sector } from "../lib/models/sector.model";

interface SectorSelectDropdownProps extends AutocompleteProps<Sector, false, false, false> {
  options: Sector[];
  onChange: (event: React.ChangeEvent<{}>, value: Sector | null) => void;
  renderInput: AutocompleteProps<Sector, false, false, false>["renderInput"];
}

const SectorSelectDropdown: React.FC<SectorSelectDropdownProps> = ({ options, onChange, renderInput, ...rest }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Autocomplete
      {...rest}
      options={options}
      onChange={onChange}
      getOptionLabel={(option) => option.sectorName}
      renderInput={(params) => <TextField {...params} label="Search" variant="outlined" onChange={handleSearch} />}
      filterOptions={(options, state) => {
        return options.filter((option) => option.sectorName.toLowerCase().includes(searchTerm.toLowerCase()));
      }}
    />
  );
};

export default SectorSelectDropdown;
