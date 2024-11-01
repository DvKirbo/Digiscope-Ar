import React from "react";
import { StyleSheet, View } from "react-native";
import ArViewer from "./components/ArViewer";

export default () => {
  return (
    <View style={styles.mainView}>
      <ArViewer />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView:{
    flex: 1,
  },
});