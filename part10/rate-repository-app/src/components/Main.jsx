import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Routes, Route } from 'react-router-native';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
    flexShrink: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;