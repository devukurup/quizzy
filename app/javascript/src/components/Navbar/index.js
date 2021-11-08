import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";
import { Header } from "@bigbinary/neetoui/v2/layouts";

const Navbar = () => {
  return (
    <div className="neeto-ui-shadow-s">
      <Header
        title={
          <Typography style="h1" weight="extrabold">
            Quizzy
          </Typography>
        }
      />
    </div>
  );
};

export default Navbar;
