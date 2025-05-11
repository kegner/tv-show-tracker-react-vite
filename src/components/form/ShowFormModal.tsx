import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { Show } from "../../types/types";
import { DatePicker } from "@mui/x-date-pickers";
import CustomTextField from "./CustomTextField";
import CustomSelectField from "./CustomSelectField";
import { Dispatch, SetStateAction } from "react";
import Spinner from "../layout/Spinner";
import dayjs from "dayjs";
import useShowForm from "../../hooks/useShowForm";

export default function ShowFormModal({
  openModal,
  show,
  setSelectedShow,
  setOpenModal,
}: {
  openModal: boolean;
  show: Show | null;
  setSelectedShow: Dispatch<SetStateAction<Show | null>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    formProps: {
      register,
      formState: { errors },
      control,
    },
    isPendingAdd,
    isPendingUpdate,
    saveAction,
  } = useShowForm({
    show,
    setSelectedShow,
    setOpenModal,
  });

  return (
    <Dialog
      closeAfterTransition={false}
      fullWidth
      maxWidth="sm"
      onClose={() => setOpenModal(false)}
      open={openModal}
      transitionDuration={0}
    >
      <DialogTitle>{show?.id ? "Update" : "Create"}</DialogTitle>
      <DialogContent>
        <form>
          {(isPendingAdd || isPendingUpdate) && <Spinner />}
          <input {...register("id")} type="hidden" />
          <Grid container mb="4px" mt="8px" spacing={2}>
            <Grid size={6}>
              <CustomTextField
                errors={errors}
                label="Title"
                propName="title"
                register={register}
                required
                type="text"
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                errors={errors}
                label="Season"
                propName="season"
                register={register}
                type="number"
              />
            </Grid>
            <Grid size={6}>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    defaultValue={
                      show?.startDate ? dayjs(show.startDate) : null
                    }
                    inputRef={field.ref}
                    label="Start Date"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    defaultValue={show?.endDate ? dayjs(show.endDate) : null}
                    inputRef={field.ref}
                    label="End Date"
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={6}>
              <CustomSelectField
                defaultValue={show?.watchStatus ?? "Not Started"}
                label="Watch Status"
                options={[
                  { label: "Not Started", value: "Not Started" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Completed", value: "Completed" },
                  { label: "Abandoned", value: "Abandoned" },
                ]}
                propName="watchStatus"
                register={register}
              />
            </Grid>
            <Grid size={6}>
              <CustomSelectField
                defaultValue={show?.seriesStatus ?? "Not Started"}
                label="Series Status"
                options={[
                  { label: "Not Started", value: "Not Started" },
                  { label: "In Progress", value: "In Progress" },
                  { label: "Completed", value: "Completed" },
                  { label: "Cancelled", value: "Cancelled" },
                ]}
                propName="seriesStatus"
                register={register}
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                errors={errors}
                label="Platform"
                propName="platform"
                register={register}
                type="text"
              />
            </Grid>
            <Grid size={6}>
              <CustomTextField
                errors={errors}
                label="Score"
                propName="score"
                register={register}
                type="number"
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
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
            <Button onClick={saveAction} variant="contained">
              {show ? "Update" : "Create"}
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
