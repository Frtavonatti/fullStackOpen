import React from 'react';
import { View, StyleSheet } from 'react-native';
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
      <AppBarTab text="Repositories" to="/" />
      <AppBarTab text="Create a review" to="/review" />
      <AppBarTab text="Sign in" to="/signin" />
    </View>
  );
};

export default AppBar;
