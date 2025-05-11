import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../layout/Spinner";
import { Show } from "../../types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteButton({
  id,
  title,
  setSelectedShow,
}: {
  id: string | null | undefined;
  title: string | null | undefined;
  setSelectedShow: Dispatch<SetStateAction<Show | null>>;
}) {
  const [openModal, setOpenModal] = useState(false);

  const queryClient = useQueryClient();

  async function deleteShow() {
    await axios.delete(`/api/v1/shows/${id}`);
  }

  const deleteMutation = useMutation({
    mutationFn: deleteShow,
    onSuccess: () => {
      setSelectedShow(null);
      setOpenModal(false);
      toast.success(`Deleted ${title}.`);
      queryClient.invalidateQueries({ queryKey: ["shows"] });
    },
    onError: (error) => {
      toast.error(`Failed to delete ${title}.`);
      console.error(error);
    },
  });

  async function deleteHandler() {
    if (!id) {
      console.error("No id found.");
      return;
    }

    deleteMutation.mutate();
  }

  return (
    <Fragment>
      {deleteMutation.isPending && <Spinner size={10} />}
      <IconButton aria-label="delete" onClick={() => setOpenModal(true)}>
        <Delete />
      </IconButton>
      <Dialog
        closeAfterTransition={false}
        fullWidth
        maxWidth="sm"
        onClose={() => setOpenModal(false)}
        open={openModal}
        transitionDuration={0}
      >
        <DialogTitle>Delete Show</DialogTitle>
        <DialogContent>Are you sure you want to delete {title}?</DialogContent>
        <DialogActions>
          <Grid columnSpacing={2} container justifyContent="flex-end" size={12}>
            <Grid>
              <Button
                color="secondary"
                onClick={() => setOpenModal(false)}
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button onClick={deleteHandler} variant="contained">
                Delete
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
