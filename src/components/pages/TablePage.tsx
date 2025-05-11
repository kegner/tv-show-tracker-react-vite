import { Dispatch, Fragment, SetStateAction, useMemo } from "react";
import ShowTable from "../table-view/ShowTable";
import ShowFormModal from "../form/ShowFormModal";
import { Show } from "../../types/types";
import { Grid, Typography } from "@mui/material";
import CreateButton from "../buttons/CreateButton";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../../utils/formatterUtils";
import Spinner from "../layout/Spinner";
import useShows from "../../hooks/useShows";
import PanelHeader from "../layout/PanelHeader";
import SearchField from "../search/SearchField";

function getColumns({
  setSelectedShow,
  setOpenModal,
}: {
  setSelectedShow: Dispatch<SetStateAction<Show | null>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}): GridColDef<Show>[] {
  return [
    {
      field: "title",
      headerName: "Title",
      flex: 2,
    },
    {
      field: "season",
      headerName: "Season",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      valueFormatter: (value: string) => formatDate(value),
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
      valueFormatter: (value: string) => formatDate(value),
    },
    {
      field: "watchStatus",
      headerName: "Watch Status",
      flex: 1,
    },
    {
      field: "seriesStatus",
      headerName: "Series Status",
      flex: 1,
    },
    {
      field: "platform",
      headerName: "Platform",
      flex: 1,
    },
    {
      field: "score",
      headerName: "Score",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Fragment>
          <EditButton
            onClick={() => {
              setSelectedShow(params.row);
              setOpenModal(true);
            }}
          />
          <DeleteButton
            id={params.row.id}
            setSelectedShow={setSelectedShow}
            title={params.row.title}
          />
        </Fragment>
      ),
    },
  ];
}

export default function TablePage() {
  const {
    loading,
    totalShows,
    shows,
    selectedShow,
    setSelectedShow,
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
    setTitleSearch,
    openModal,
    setOpenModal,
  } = useShows();

  const columns = useMemo(
    () => getColumns({ setSelectedShow, setOpenModal }),
    [setSelectedShow, setOpenModal]
  );

  return (
    <Fragment>
      {loading && <Spinner />}
      <PanelHeader>
        <Grid alignItems="center" columnSpacing={2} container>
          <Grid>
            <Typography variant="h5">Table</Typography>
          </Grid>
          <Grid>
            <SearchField setSearch={setTitleSearch} />
          </Grid>
        </Grid>
        <Grid>
          <CreateButton
            onClick={() => {
              setSelectedShow(null);
              setOpenModal(true);
            }}
          />
        </Grid>
      </PanelHeader>
      <ShowTable
        columns={columns}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
        setSortModel={setSortModel}
        shows={shows}
        sortModel={sortModel}
        totalShows={totalShows}
      />
      <ShowFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setSelectedShow={setSelectedShow}
        show={selectedShow}
      />
    </Fragment>
  );
}
