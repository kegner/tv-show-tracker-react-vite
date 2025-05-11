import { styled, useTheme } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { getThemeColor } from "../../themes/theme";

export default function Spinner({ size = 120 }: { size?: number }) {
  const theme = useTheme();

  return <StyledLoader color={getThemeColor(theme, "spinner")} size={size} />;
}

const StyledLoader = styled(ClipLoader)`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
