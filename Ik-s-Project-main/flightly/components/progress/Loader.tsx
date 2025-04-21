import React, { FC } from "react";
import Box from "../layout/Box";
import { Spinner, spinnerStyle } from "./Spinner";
import globalStyle from "@/globalStyle/globalStyle";

interface loaderProp {
  isTransparent?: boolean;
}
const Loader: FC<loaderProp> = ({ isTransparent }) => {
  return (
    <Box
      style={[
        globalStyle.justifyCenter,
        globalStyle.height,
        globalStyle.alignItemsCenter,
        isTransparent && globalStyle.bgTransparent,
      ]}
    >
      <Box style={[spinnerStyle.spin]}>
        <Spinner isPrimary />
      </Box>
    </Box>
  );
};

export default Loader;
