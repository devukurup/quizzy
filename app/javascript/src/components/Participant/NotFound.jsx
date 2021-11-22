import React from "react";

import { Warning } from "@bigbinary/neeto-icons";
import { Typography } from "@bigbinary/neetoui/v2";

const NotFound = () => {
  return (
    <div className="flex flex-col space-y-5 items-center justify-center mx-auto mt-40 ">
      <Warning color="#f56a58" size={54} />
      <Typography style="h1">Quiz Not Found</Typography>
    </div>
  );
};

export default NotFound;
