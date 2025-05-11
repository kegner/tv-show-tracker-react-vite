import { TextField } from "@mui/material";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SearchField({
  setSearch,
}: {
  setSearch: (value: string) => void;
}) {
  const [value, setValue] = useState("");

  const debouncedCallback = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 300);

  return (
    <TextField
      label="Title Search"
      onChange={(e) => {
        setValue(e.target.value);
        debouncedCallback(e.target.value);
      }}
      placeholder="Search by title..."
      slotProps={{
        inputLabel: {
          disableAnimation: true,
        },
      }}
      value={value}
      variant="outlined"
    />
  );
}
