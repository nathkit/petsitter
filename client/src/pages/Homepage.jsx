import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ExclamationCircleIcon } from "../components/systemdesign/Icons";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonGhost,
  ButtonSocial,
} from "../components/systemdesign/Button";
function HomePage() {
  return (
    <>
      <ButtonPrimary content="ButtonPrimary" width="200px" />
      <ButtonSecondary content="ButtonSecondary" width="200px" />
      <ButtonGhost content="ButtonGhost" />
      <ButtonSocial
        content="ButtonSocial"
        width="400px"
        icon={ExclamationCircleIcon}
      />
      <div></div>
    </>
  );
}

export default HomePage;
