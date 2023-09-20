import React from "react";
import { Alert } from "@mui/material";
import { TurnBack } from "../UserManagement/PetProfile";
import { useAuth } from "../../contexts/authentication";
import { Box } from "@mui/material";
function AlertBox() {
  const { alertMessage } = useAuth();
  return (
    <Box className="flex justify-between h-[3rem] mb-10">
      <TurnBack />
      {/* alert box *************************************** */}
      {alertMessage ? (
        <Alert
          severity={alertMessage.severity}
          className="min-w-[30%] w-auto"
          sx={alertMessage.severity ? { boxShadow: 1 } : null}
        >
          {alertMessage.message}
        </Alert>
      ) : null}
    </Box>
  );
}

export default AlertBox;
