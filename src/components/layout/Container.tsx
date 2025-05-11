import { Box } from "@mui/material";
import { ReactNode } from "react";
import { getThemeColor } from "../../themes/theme";

export default function Container({
  children,
  height,
}: {
  children: ReactNode;
  height: string;
}) {
  return (
    <Box
      sx={{
        height,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: (theme) => getThemeColor(theme, "border"),
        borderRadius: "8px",
        padding: "8px",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          height: "100%",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
