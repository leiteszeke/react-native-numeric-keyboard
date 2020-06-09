import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import Keyboard from './dist';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <Keyboard />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default App;
