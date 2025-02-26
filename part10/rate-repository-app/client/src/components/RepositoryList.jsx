import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge =>  edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={<View style={styles.separator} />}
      renderItem={({ item }) => <RepositoryItem repo={item}/>}
    />
  );
}

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();

  if (loading) return 'Loading...'
  
  return (
    <View style={styles.container}>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    paddingTop: 80, //StatusBar.height constant,
  },
  separator: {
    height: 10,
  },
});

export default RepositoryList;