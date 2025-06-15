import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

// import axios from "axios";

export default function MoreMenu({ postId, onDelete ,onUpdate }) {
  //   let [posts, setPosts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onUpdate(postId);
            navigate(`/editPost/${postId}`);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(postId);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
