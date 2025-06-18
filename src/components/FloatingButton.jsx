import React from 'react'
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from 'react-router-dom';


export default function FloatingButton() {
  let navigate = useNavigate()
  return (
    <div>
      <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        backgroundColor: "black", 
        "&:hover": {
          backgroundColor: "#262626", 
        },
      }}
      onClick={() => navigate('/add-post')}
    >
      <AddIcon />
    </Fab>
    </div>
  )
}
