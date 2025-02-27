import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../repositories/RepositoryItem';
import Dropdown from '../ui/DropDown';

export const RepositoryListContainer = ({ 
  repositories, 
  setOrderBy, 
  setOrderDirection }) => {
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge =>  edge.node)
    : []

  return (
    <SafeAreaView style={styles.container}>
      <Dropdown setOrderBy={setOrderBy} setOrderDirection={setOrderDirection}/>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({ item }) => <RepositoryItem repo={item}/>}
      />
    </SafeAreaView>
  );
}

const RepositoryList = () => {
  const [ orderBy, setOrderBy ] = useState('CREATED_AT');
  const [ orderDirection, setOrderDirection ] = useState('DESC'); 
  const { repositories, loading, refetch } = useRepositories(orderBy, orderDirection);

  if (loading) return <Text>'Loading...'</Text>
  
  return (
    <RepositoryListContainer 
      repositories={repositories} 
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  separator: {
    height: 10,
  },
});

export default RepositoryList;