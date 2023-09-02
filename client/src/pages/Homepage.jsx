import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FacebookIcon } from "../components/systemdesign/Icons";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonGhost,
  ButtonSocial,
  ButtonIcon,
} from "../components/systemdesign/Button";
function HomePage() {
  return (
    <>
      <ButtonPrimary content="ButtonPrimary" width="200px" />
      <ButtonSecondary content="ButtonSecondary" width="200px" />
      <ButtonGhost content="ButtonGhost" />
      <ButtonSocial content="Facebook" icon={FacebookIcon} width="200px" />
      <ButtonIcon icon={FacebookIcon} />
      <div></div>
    </>
  );
}

export default HomePage;
