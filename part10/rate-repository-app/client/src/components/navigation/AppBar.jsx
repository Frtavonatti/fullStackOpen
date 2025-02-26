import React, { useContext } from 'react';
import { useNavigate } from 'react-router-native';
import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_USER } from '../../graphql/queries';
import AuthStorageContext from '../../context/authStorageContext';
import AppBarTab from './AppBarTab';
import theme from '../../theme'

const AppBar = () => {
  const { data: userData, refetch } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  });
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signout = async () => {
    try {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore();
      await refetch();
      navigate('/signin');
    } catch (error) {
      console.error('Error during signout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollview}>
        <AppBarTab text="Repositories" to="/" />
        {userData?.me === null ? (
          <>
            <AppBarTab text="Sign in" to="/signin" /> 
            <AppBarTab text="Sign up" to="/signup" />
          </>
        ) : (
          <>
            <AppBarTab text="Create a review" to="/create-review" />
            <AppBarTab text="My reviews" to="/my-reviews" />
            <AppBarTab text="Sign out" onPress={signout} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBar,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1000,
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
