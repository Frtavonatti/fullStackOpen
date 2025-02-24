import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge =>  edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item}/>}
    />
  );
}

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();

  if (loading) return 'Loading...'
  return (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;