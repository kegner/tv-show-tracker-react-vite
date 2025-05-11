import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { Show } from "../types/types";
import {
  GridPaginationModel,
  GridSortItem,
  GridSortModel,
} from "@mui/x-data-grid";
import { useSearchParams } from "react-router";
import { formatToNumber } from "../utils/formatterUtils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type DataResponse = {
  results: Show[];
  total: number;
};

function convertSortModelToString(sortModel: GridSortModel) {
  const sortFields = sortModel.map((sort) => sort.field + ":" + sort.sort);
  return sortFields.toString();
}

function convertStringToSortModel(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const sortItems = value.split(",");

  return sortItems
    .map((sortItem) => {
      const sortValues = sortItem.split(":");

      if (sortValues.length == 2) {
        return {
          field: sortValues[0],
          sort: sortValues[1],
        } as GridSortItem;
      }

      return null;
    })
    .filter((value): value is GridSortItem => Boolean(value));
}

const defaultSortModel: GridSortModel = [{ field: "title", sort: "asc" }];

export default function useShows() {
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams({
    page: "0",
    pageSize: "10",
    sort: convertSortModelToString(defaultSortModel),
  });

  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const sort = searchParams.get("sort");

  const paginationModel: GridPaginationModel = useMemo(
    () => ({
      page: formatToNumber(page) ?? 0,
      pageSize: formatToNumber(pageSize) ?? 10,
    }),
    [page, pageSize]
  );

  const sortModel: GridSortModel = useMemo(
    () => convertStringToSortModel(sort) ?? [],
    [sort]
  );

  async function fetchShows() {
    const res = await axios.get(`/api/v1/shows?${searchParams.toString()}`);

    return res.data.shows;
  }

  const { data, isFetching } = useQuery<DataResponse>({
    queryKey: ["shows", searchParams.toString()],
    queryFn: fetchShows,
    placeholderData: keepPreviousData,
  });

  const shows = data?.results ?? [];
  const totalShows = data?.total ?? 0;

  const setPaginationModel = useCallback(
    (paginationModel: GridPaginationModel) => {
      setSearchParams((prev) => {
        prev.set("page", paginationModel.page.toString());
        prev.set("pageSize", paginationModel.pageSize.toString());

        return prev;
      });
    },
    [setSearchParams]
  );

  const setSortModel = useCallback(
    (sortModel: GridSortModel) => {
      setSearchParams((prev) => {
        const sortString = convertSortModelToString(sortModel);

        if (sortString) {
          prev.set("sort", sortString);
        } else {
          prev.delete("sort");
        }

        return prev;
      });
    },
    [setSearchParams]
  );

  const setTitleSearch = useCallback(
    (titleSearch: string) => {
      setSearchParams((prev) => {
        if (titleSearch) {
          prev.set("search", titleSearch);
        } else {
          prev.delete("search");
        }

        return prev;
      });
    },
    [setSearchParams]
  );

  return {
    loading: isFetching,
    shows,
    totalShows,
    selectedShow,
    setSelectedShow,
    paginationModel,
    setPaginationModel,
    sortModel,
    setSortModel,
    setTitleSearch,
    openModal,
    setOpenModal,
  };
}
