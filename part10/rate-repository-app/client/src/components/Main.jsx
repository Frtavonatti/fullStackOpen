import React, { useContext } from 'react';
import { useNavigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import { Routes, Route } from 'react-router-native';
import AuthStorageContext from '../context/authStorageContext';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';


const Main = () => {
  const navigate = useNavigate();
  const authStorage = useContext(AuthStorageContext);
  
  const isUserLogged = async () => {
    const token = await authStorage.getAccessToken()
    if (!token) {
      navigate('/signin');
    } 
  }
  isUserLogged();

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