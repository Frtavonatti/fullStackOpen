import React from 'react';
import { Routes, Route } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './pages/RepositoryList';
import SingleRepositoryView from './pages/SingleRepositoryView';
import CreateReview from './pages/CreateReview';
import MyReviews from './pages/MyReviews';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AppBar from './navigation/AppBar';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<SingleRepositoryView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/my-reviews" element={<MyReviews />} />
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