import { useForm } from "react-hook-form";
import { Show } from "../types/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const emptyShow: Show = {
  id: null,
  title: null,
  season: 1,
  startDate: null,
  endDate: null,
  watchStatus: "Not Started",
  seriesStatus: "Not Started",
  platform: null,
  score: 1,
};

export default function useShowForm({
  show,
  setSelectedShow,
  setOpenModal,
}: {
  show: Show | null;
  setSelectedShow: Dispatch<SetStateAction<Show | null>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const formProps = useForm<Show>({
    defaultValues: {
      season: 1,
      score: 1,
    },
  });

  const { handleSubmit, reset } = formProps;

  useEffect(() => {
    reset(show ?? emptyShow);
  }, [show, reset]);

  const queryClient = useQueryClient();

  async function addShow(data: Show) {
    const result = await axios.post<Show>("/api/v1/shows", data);

    return result.data;
  }

  async function updateShow(data: Show) {
    const result = await axios.put<Show>("/api/v1/shows", data);

    return result.data;
  }

  async function onSuccess(data: Show, action: "added" | "updated") {
    setSelectedShow(data);
    setOpenModal(false);
    toast.success(`${data.title} ${action} successfully.`);
    reset(emptyShow);
    queryClient.invalidateQueries({ queryKey: ["shows"] });
  }

  async function onError(
    error: Error,
    variables: Show,
    action: "creating" | "updating"
  ) {
    toast.error(`An error occurred ${action} ${variables.title}.`);
    console.error(error);
  }

  const addMutation = useMutation({
    mutationFn: addShow,
    onSuccess: (data) => {
      onSuccess(data, "added");
    },
    onError: (error, variables) => {
      onError(error, variables, "creating");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateShow,
    onSuccess: (data) => {
      onSuccess(data, "updated");
    },
    onError: (error, variables) => {
      onError(error, variables, "updating");
    },
  });

  async function save(data: Show) {
    // This is a new show
    if (!data.id) {
      // Remove the id field to avoid null values being sent
      delete data.id;

      addMutation.mutate(data);
      // This is an update to an existing show
    } else {
      updateMutation.mutate(data);
    }
  }

  async function saveAction() {
    await handleSubmit(save)();
  }

  return {
    formProps,
    isPendingAdd: addMutation.isPending,
    isPendingUpdate: updateMutation.isPending,
    saveAction,
  };
}
