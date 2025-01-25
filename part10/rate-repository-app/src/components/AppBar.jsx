import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    width: 412,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-evenly',
    paddingBottom: 30
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={"Repositories"}/>
      <AppBarTab text={"Create a review"}/>
      <AppBarTab text={"Sign out"}/>
    </View>
  );
};

export default AppBar;
