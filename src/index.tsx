import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import deleteIcon from "./images/icon_delete.png";
import styles, { keyStyle, BG_COLOR } from "./styles";

const numberKeys = [
  [
    { mainText: "1", otherText: "" },
    { mainText: "2", otherText: "ABC" },
    { mainText: "3", otherText: "DEF" },
  ],
  [
    { mainText: "4", otherText: "GHI" },
    { mainText: "5", otherText: "JKL" },
    { mainText: "6", otherText: "MNO" },
  ],
  [
    { mainText: "7", otherText: "PQRS" },
    { mainText: "8", otherText: "TUV" },
    { mainText: "9", otherText: "WXYZ" },
  ],
];

export enum KeyboardType {
  DECIMAL_PAD = "DECIMAL_PAD",
  NUMERIC_PAD = "NUMERIC_PAD",
}

export type KeyboardProps = {
  disableBorder?: boolean;
  disableClearButtonBackground?: boolean;
  disableDot?: boolean;
  disableDotButtonBackground?: boolean;
  disableOtherText?: boolean;
  keyboardType?: KeyboardType;
  onClear?: () => void;
  onDelete?: () => void;
  onKeyPress?: (key: string) => void;
};

const Keyboard = ({
  disableBorder,
  disableClearButtonBackground,
  disableDot,
  disableDotButtonBackground,
  disableOtherText,
  keyboardType = KeyboardType.DECIMAL_PAD,
  onClear,
  onDelete,
  onKeyPress,
}: KeyboardProps) => {
  const clearAll = () => onClear?.();

  const onPress = (key: string) => () => {
    if (key === "") return;
    if (key === "del") return onDelete?.();
    return onKeyPress?.(key);
  };

  const renderOtherText = (key: { otherText?: string }) => {
    if (disableOtherText !== true) {
      return <Text style={keyStyle.otherText}>{key.otherText}</Text>;
    }

    return null;
  };

  const borderColor = React.useMemo(
    () => (disableBorder !== true ? keyStyle.bd : keyStyle.border),
    [disableBorder]
  );

  const clearBtnBg = React.useMemo(
    () =>
      disableClearButtonBackground !== true
        ? keyStyle.bg_d2d5dc
        : keyStyle.bgLess,
    [disableClearButtonBackground]
  );

  const dotBtnBg = React.useMemo(
    () =>
      disableDotButtonBackground !== true
        ? keyStyle.bg_d2d5dc
        : keyStyle.bgLess,
    [disableDotButtonBackground]
  );

  const isDecimalPad = React.useMemo(
    () => keyboardType === KeyboardType.DECIMAL_PAD,
    [keyboardType]
  );

  const renderKey = (
    key: { mainText?: string; otherText?: string },
    index: number
  ) => (
    <TouchableWithoutFeedback
      key={index}
      style={keyStyle.wrapper}
      onPress={onPress(key.mainText)}
    >
      <View style={[keyStyle.bd, borderColor]}>
        <Text style={keyStyle.mainText}>{key.mainText}</Text>
        {renderOtherText(key)}
      </View>
    </TouchableWithoutFeedback>
  );

  const renderNumberKeys = () =>
    numberKeys.map((group, groupIndex) => (
      <View key={groupIndex} style={styles.row}>
        {group.map(renderKey)}
      </View>
    ));

  const renderDotKey = () => {
    if (disableDot !== true) {
      let dotNode = null;
      let dotText = "";

      if (isDecimalPad) {
        dotText = ".";
        dotNode = <Text style={[keyStyle.mainText, keyStyle.dot]}>.</Text>;
      }

      return (
        <TouchableWithoutFeedback
          style={[keyStyle.wrapper, dotBtnBg]}
          onPress={onPress(dotText)}
        >
          <View style={[keyStyle.bd, borderColor]}>{dotNode}</View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableWithoutFeedback style={keyStyle.wrapper}>
        <View />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.main}>
        {renderNumberKeys()}

        <View style={styles.row}>
          {renderDotKey()}

          <TouchableWithoutFeedback
            style={keyStyle.wrapper}
            onPress={onPress("0")}
          >
            <View style={[keyStyle.bd, borderColor]}>
              <Text style={keyStyle.mainText}>0</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            style={[keyStyle.wrapper, clearBtnBg]}
            onPress={onPress("del")}
            onLongPress={clearAll}
          >
            <View style={[keyStyle.bd, borderColor]}>
              <Image source={deleteIcon} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default Keyboard;
