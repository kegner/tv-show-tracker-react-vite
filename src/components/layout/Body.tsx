import { Route, Routes } from "react-router";
import TablePage from "../pages/TablePage";
import { Box } from "@mui/material";
import SplitViewPage from "../pages/SplitViewPage";

export default function Body() {
  return (
    <Box mb="32px" mx={4}>
      <Routes>
        <Route element={<TablePage />} path="/" />
        <Route element={<TablePage />} path="/table" />
        <Route element={<SplitViewPage />} path="/split-view" />
      </Routes>
    </Box>
  );
}
