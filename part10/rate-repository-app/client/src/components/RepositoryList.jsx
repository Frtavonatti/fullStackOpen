import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories();
  
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge =>  edge.node)
    : []

  if (loading) return 'Loading...'

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item}/>}
    />
  );
};

export default RepositoryList;