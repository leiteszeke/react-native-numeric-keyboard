import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import deleteIcon from "./images/delete_icon.png";
import styles, { keyStyle } from "./styles";

type NumberPadItem = {
  number: string;
  letters: string;
};

type NumberPadRow = NumberPadItem[];

const numberKeys: NumberPadRow[] = [
  [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
  ],
  [
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
  ],
  [
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
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

  const renderOtherText = (key: NumberPadItem) => {
    if (disableOtherText !== true) {
      return <Text style={keyStyle.otherText}>{key.letters}</Text>;
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
        : keyStyle.bgLessL,
    [disableClearButtonBackground]
  );

  const dotBtnBg = React.useMemo(
    () =>
      disableDotButtonBackground !== true
        ? keyStyle.bg_d2d5dc
        : keyStyle.bgLessL,
    [disableDotButtonBackground]
  );

  const isDecimalPad = React.useMemo(
    () => keyboardType === KeyboardType.DECIMAL_PAD,
    [keyboardType]
  );

  const renderKey = (key: NumberPadItem, index: number) => (
    <TouchableWithoutFeedback
      key={index}
      style={keyStyle.wrapper}
      onPress={onPress(key.number)}
    >
      <View style={[keyStyle.bd, borderColor]}>
        <Text style={keyStyle.mainText}>{key.number}</Text>
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
