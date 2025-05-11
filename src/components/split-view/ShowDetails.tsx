import { Fragment } from "react";
import { Box, Grid } from "@mui/material";
import { Show } from "../../types/types";
import Container from "../layout/Container";
import { formatDate } from "../../utils/formatterUtils";

const gridSize = { xs: 12, md: 6, lg: 4 };

function DetailsItem({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <Fragment>
      <Box mb="4px">
        <strong>{label}</strong>
      </Box>
      <Box>{value}</Box>
    </Fragment>
  );
}

export default function ShowDetails({ show }: { show: Show }) {
  return (
    <Container height="650px">
      <Grid container padding="16px" rowSpacing={4}>
        <Grid size={gridSize}>
          <DetailsItem label="Title" value={show.title} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="Season" value={show.season} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="Start Date" value={formatDate(show.startDate)} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="End Date" value={formatDate(show.endDate)} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="Watch Status" value={show.watchStatus} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="Series Status" value={show.seriesStatus} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="Platform" value={show.platform} />
        </Grid>
        <Grid size={gridSize}>
          <DetailsItem label="Score" value={show.score} />
        </Grid>
      </Grid>
    </Container>
  );
}
