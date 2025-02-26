import React from 'react';
import { FlatList, View, StyleSheet, SafeAreaView } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge =>  edge.node)
    : []

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({ item }) => <RepositoryItem repo={item}/>}
      />
    </SafeAreaView>
  );
}

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();

  if (loading) return 'Loading...'
  
  return (
    <RepositoryListContainer repositories={repositories} />
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