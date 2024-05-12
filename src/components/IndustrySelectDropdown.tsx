import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { Industry } from "../lib/models/industry.model";

interface IndustryDropdownProps extends AutocompleteProps<Industry, false, false, false> {
  options: Industry[];
  onChange: (event: React.ChangeEvent<{}>, value: Industry | null) => void;
  renderInput: AutocompleteProps<Industry, false, false, false>["renderInput"];
}

const IndustrySelectDropdown: React.FC<IndustryDropdownProps> = ({ options, onChange, renderInput, ...rest }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Autocomplete
      {...rest}
      options={options}
      onChange={onChange}
      getOptionLabel={(option) => option.industryName}
      renderInput={(params) => <TextField {...params} label="Search" variant="outlined" onChange={handleSearch} />}
      filterOptions={(options, state) => {
        return options.filter((option) => option.industryName.toLowerCase().includes(searchTerm.toLowerCase()));
      }}
    />
  );
};

export default IndustrySelectDropdown;
