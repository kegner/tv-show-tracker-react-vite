import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
} from "@mui/x-data-grid";
import { Show } from "../../types/types";
import Container from "../layout/Container";

export default function ShowTable({
  columns,
  shows,
  totalShows,
  paginationModel,
  setPaginationModel,
  sortModel,
  setSortModel,
  onRowClick,
}: {
  columns: GridColDef<Show>[];
  shows: Show[];
  totalShows: number;
  paginationModel: GridPaginationModel;
  setPaginationModel: (value: GridPaginationModel) => void;
  sortModel: GridSortModel;
  setSortModel: (value: GridSortModel) => void;
  onRowClick?: (params: GridRowParams<Show>) => void;
}) {
  return (
    <Container height="650px">
      <DataGrid
        columns={columns}
        disableColumnMenu
        disableRowSelectionOnClick
        onPaginationModelChange={setPaginationModel}
        onRowClick={onRowClick}
        onSortModelChange={setSortModel}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode="server"
        paginationModel={paginationModel}
        rowCount={totalShows}
        rows={shows}
        sortModel={sortModel}
        sortingMode="server"
        sx={{
          border: "none",
        }}
      />
    </Container>
  );
}
