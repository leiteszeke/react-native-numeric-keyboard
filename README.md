# react-native-numeric-keyboard

A virtual numeric keyboard component for React Native.

## Install

```bash
  # Using NPM
  npm install react-native-numeric-keyboard --save
  # Using Yarn
  yarn add react-native-numeric-keyboard
```

## Example

```javascript
import React from 'react'
import { Alert } from 'react-native';
import Keyboard, { KeyboardType } from 'react-native-numeric-keyboard';

const App = () => {
  const onClearKey = () => Alert.alert('Keyboard', 'On clear pressed');
  const onDeleteKey = () => Alert.alert('Keyboard', 'On delete pressed');
  const onPressKey = () => Alert.alert('Keyboard', 'On key pressed');

  return (
    <Keyboard
      disableOtherText
      disableClearButtonBackground
      onClear={onClearKey}
      onDelete={onDeleteKey}
      onKeyPress={onPressKey}
      keyboardType={KeyboardType.DECIMAL_PAD}
    />
  )
}
```

## Props

| prop  | type  | default | description  |
|---|---|---|---|---|
| keyboardType  | enum number-pad \| decimal-pad | number-pad
| onKeyPress  | func | () => void |
| onDelete  | func | () => void |
| onClear  | func | () => void |
