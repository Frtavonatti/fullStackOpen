import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme'

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollview}>
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Create a review" to="/" />
        <AppBarTab text="Sign in" to="/signin" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBar,
    width: '100%',
  },
  scrollview: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 30,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
  }
});

export default AppBar;
