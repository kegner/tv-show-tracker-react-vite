export function formatDate(date: string | null | undefined) {
  if (!date) {
    return "";
  }

  return Intl.DateTimeFormat("en-US").format(new Date(date));
}

export function formatToNumber(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  if (!isNaN(Number(value))) {
    return Number(value);
  }

  return null;
}
