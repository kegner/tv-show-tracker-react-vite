import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton aria-label="edit" onClick={onClick}>
      <Edit />
    </IconButton>
  );
}
