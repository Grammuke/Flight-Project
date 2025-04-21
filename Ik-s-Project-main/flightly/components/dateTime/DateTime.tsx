import React, { FC, useCallback, useState } from "react";
import DatePicker from "react-native-date-picker";
import ArrowDown from "@/assets/svgs/arrowDown.svg";
import Calendar from "@/assets/svgs/calendar.svg";
import Box from "../layout/Box";
import PressableComponent from "../pressable/PressableComponent";
import TextComponent from "../text/TextComponent";
import moment from "moment";
import { ScaledSheet } from "react-native-size-matters";
import inputStyles from "../textInputs/inputStyles";
import ItemTitle from "../utils/ItemTitle";
import globalStyle from "@/globalStyle/globalStyle";
import ItemError from "../utils/ItemError";
export type DateTimeProps = {
  date?: Date;
  setDate: any;
  placeholder: string;
  title?: string;
  pickerTitle?: string;
  noBefore?: boolean;
  noAfter?: Date | boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  errorText?: string;
  initial?: boolean;
  whiteBg?: boolean;
  testId?: string;
  // setError?: (value: string) => void;
  pickerType?: "date" | "time" | "datetime";
  disable?: boolean;
  required?: boolean;
};

const DateTime: FC<DateTimeProps> = ({
  date = new Date(),
  placeholder,
  setDate,
  noBefore,
  pickerType = "date",
  title,
  pickerTitle,
  errorText,
  noAfter,
  testId,
  initial = false,
  whiteBg = true,
  disable,
  required,
  maximumDate,
  minimumDate,
}) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(initial);

  const showDatepicker = () => {
    setShow(true);
  };

  const formatDate = useCallback(
    (val: Date) => {
      return moment(val).format(
        pickerType === "datetime"
          ? "MMMM D, YYYY | h:mm A"
          : pickerType === "time"
          ? "h:mm A"
          : "L"
      );
    },
    [pickerType]
  );

  const onChange = (selectedDate: any) => {
    setDate(selectedDate);
    setShow(false);
    setEdit(true);
  };
  console.log({
    errorText,
  });

  return (
    <Box>
      {title && <ItemTitle required={required} title={title} />}

      <PressableComponent
        disabled={disable}
        onPress={!disable ? showDatepicker : undefined}
        style={[
          globalStyle.w10,
          globalStyle.borderRadius12,
          globalStyle.textInputBg,
          globalStyle.textInputHeight,
        ]}
      >
        <Box
          style={[
            globalStyle.flexrow,
            globalStyle.justifyCenter,
            globalStyle.alignItemsCenter,
            globalStyle.justifyBetween,
            globalStyle.px1,
            globalStyle.flexOne,
          ]}
        >
          <TextComponent
            style={[
              globalStyle.fontSize12,
              !edit && !initial && globalStyle.textPlaceholder,
            ]}
          >
            {initial ? formatDate(date) : edit ? formatDate(date) : placeholder}
          </TextComponent>
          <Box
            style={[
              dateTimeStyle.iconBox,
              globalStyle.justifyCenter,
              globalStyle.alignItemsEnd,
            ]}
          >
            {pickerType === "time" ? <ArrowDown /> : <Calendar />}
          </Box>
        </Box>
      </PressableComponent>
      {errorText && <ItemError errorText={errorText} />}
      <DatePicker
        modal
        open={show}
        testID={testId || "DatePicker"}
        date={date}
        minimumDate={
          minimumDate ? minimumDate : noBefore ? new Date() : undefined
        }
        maximumDate={
          maximumDate ? maximumDate : noAfter ? new Date() : undefined
        }
        title={pickerTitle}
        mode={pickerType}
        theme="dark"
        // textColor={theme.colors.black}
        onConfirm={(val) => {
          setShow(false);
          onChange(val);
        }}
        onCancel={() => {
          setShow(false);
        }}
      />
    </Box>
  );
};

export const dateTimeStyle = ScaledSheet.create({
  iconBox: {
    height: 25,
    width: 25,
  },
});
export default DateTime;
