import React, { FC } from "react";
import { InputProps } from "../textInputs/SearchInputComponent";
import TextComponent from "../text/TextComponent";
import globalStyle from "@/globalStyle/globalStyle";

const ItemError: FC<Pick<InputProps, "errorText">> = ({ errorText }) => {
  return (
    <TextComponent
      style={[
        globalStyle.fontSize12,
        globalStyle.errorText,
        globalStyle.ml1,
        globalStyle.mt1,
      ]}
    >
      {`* ${errorText}`}
    </TextComponent>
  );
};

export default ItemError;
