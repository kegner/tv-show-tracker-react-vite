import { Button } from "@mui/material";

export default function CreateButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="contained">
      Create
    </Button>
  );
}
