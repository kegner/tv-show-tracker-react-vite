import { Grid } from "@mui/material";
import { ReactNode } from "react";

export default function PanelHeader({ children }: { children: ReactNode }) {
  return (
    <Grid
      alignItems="flex-end"
      container
      justifyContent="space-between"
      maxHeight="36px"
      mb={2}
      mx={2}
    >
      {children}
    </Grid>
  );
}
