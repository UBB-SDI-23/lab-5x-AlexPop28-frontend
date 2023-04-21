import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { IconButton, Tooltip } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import { FC } from "react";

interface DeleteButtonProps {
  onDelete: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onDelete }) => {
  const confirm = useConfirm();

  const handleClick = () => {
    confirm({
      description:
        "Are you sure you want to delete this? This operation cannot be undone!",
    }).then(onDelete);
  };

  return (
    <IconButton sx={{ mr: 3 }} onClick={handleClick}>
      <Tooltip title="Delete" arrow>
        <DeleteForeverIcon sx={{ color: "red" }} />
      </Tooltip>
    </IconButton>
  );
};
