import { Skeleton } from "moti/skeleton";
import React, { FC, useState } from "react";
import Box from "../layout/Box";
import globalStyle from "@/globalStyle/globalStyle";
import { ActivityIndicator, Image, ImageProps } from "react-native";
import pallete from "@/constants/colors/pallete";

interface imageProp {
  isVisible?: boolean;
}

const ImageComponent: FC<ImageProps & imageProp> = ({ isVisible, ...rest }) => {
  const [showLoad, setShowLoad] = useState(true);

  return (
    <Box
      style={[
        globalStyle.justifyCenter,
        globalStyle.alignItemsCenter,
        globalStyle.w10,
        rest.style as any,
      ]}
    >
      <>
        <Box style={[globalStyle.w10, globalStyle.h10]}>
          <Image
            onLoad={() => {
              setShowLoad(false);
            }}
            onError={() => {
              setShowLoad(false);
            }}
            {...rest}
          />
        </Box>

        {(isVisible || showLoad) && (
          <Box
            style={[
              globalStyle.w10,
              globalStyle.h10,
              globalStyle.justifyCenter,
              globalStyle.alignItemsCenter,
              globalStyle.absolute,
              globalStyle.br,
              {
                zIndex: 5,
              },
            ]}
          >
            <ActivityIndicator size={"small"} color={pallete.primaryGrey500} />
          </Box>
        )}
      </>
    </Box>
  );
};

export default ImageComponent;
