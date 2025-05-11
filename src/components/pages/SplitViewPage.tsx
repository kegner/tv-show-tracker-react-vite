import { Fragment, ReactNode, useState } from "react";
import useShows from "../../hooks/useShows";
import Spinner from "../layout/Spinner";
import { Grid, Typography } from "@mui/material";
import CreateButton from "../buttons/CreateButton";
import ShowFormModal from "../form/ShowFormModal";
import ShowDetails from "../split-view/ShowDetails";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import { Show } from "../../types/types";
import PanelHeader from "../layout/PanelHeader";
import ShowTable from "../table-view/ShowTable";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import SearchField from "../search/SearchField";

const columns: GridColDef<Show>[] = [
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
    field: "score",
    headerName: "Score",
    flex: 1,
  },
];

export default function SplitViewPage() {
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

  // Create a separate state variable for the modal so that clicking "Create" does not clear the current selection
  // for the ShowDetails component
  const [showToUpdate, setShowToUpdate] = useState<Show | null>(null);

  return (
    <Fragment>
      {loading && <Spinner />}
      <Grid container spacing={2}>
        <Panel>
          <PanelHeader>
            <Grid>
              <SearchField setSearch={setTitleSearch} />
            </Grid>
            <Grid>
              <CreateButton
                onClick={() => {
                  setShowToUpdate(null);
                  setOpenModal(true);
                }}
              />
            </Grid>
          </PanelHeader>
          <Grid size={12}>
            <ShowTable
              columns={columns}
              onRowClick={(params: GridRowParams<Show>) => {
                setSelectedShow(params.row);
              }}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              setSortModel={setSortModel}
              shows={shows}
              sortModel={sortModel}
              totalShows={totalShows}
            />
          </Grid>
        </Panel>
        {selectedShow && (
          <Panel>
            <PanelHeader>
              <Grid>
                <Typography variant="h5">Details</Typography>
              </Grid>
              <Grid container>
                <Grid>
                  <EditButton
                    onClick={() => {
                      setOpenModal(true);
                      setShowToUpdate(selectedShow);
                    }}
                  />
                </Grid>
                <Grid>
                  <DeleteButton
                    id={selectedShow.id}
                    setSelectedShow={setSelectedShow}
                    title={selectedShow.title}
                  />
                </Grid>
              </Grid>
            </PanelHeader>
            <Grid>
              <ShowDetails show={selectedShow} />
            </Grid>
          </Panel>
        )}
      </Grid>
      <ShowFormModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setSelectedShow={setSelectedShow}
        show={showToUpdate}
      />
    </Fragment>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return (
    <Grid container flexDirection="column" size={{ xs: 12, md: 6 }}>
      {children}
    </Grid>
  );
}
