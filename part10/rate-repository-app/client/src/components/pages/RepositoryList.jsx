import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../../hooks/useRepositories';
import RepositoryItem from '../repositories/RepositoryItem';
import Dropdown from '../ui/DropDown';
import Search from '../ui/SearchBar';
import layout from '../../layout';

//TODO: Fix issue where SearchBar loses focus after query execution (10.24)
export const RepositoryListContainer = ({ 
  repositories,
  onEndReach,
  searchKeyword,
  setSearchKeyword,
  setOrderBy, 
  setOrderDirection }) => {
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge =>  edge.node)
    : []

  return (
    <SafeAreaView style={styles.container}>
      <Search 
        searchKeyword={searchKeyword} 
        setSearchKeyword={setSearchKeyword}
      />
      <Dropdown 
        setOrderBy={setOrderBy} 
        setOrderDirection={setOrderDirection}
      />
      <FlatList
        data={repositoryNodes}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={<View style={styles.separator} />}
        renderItem={({ item }) => <RepositoryItem repo={item}/>}
      />
    </SafeAreaView>
  );
}

const RepositoryList = () => { 
  const [ searchKeyword, setSearchKeyword ] = useState();
  const [ debouncedSearchKeyword ] = useDebounce(searchKeyword, 500);
  const [ orderBy, setOrderBy ] = useState('CREATED_AT');
  const [ orderDirection, setOrderDirection ] = useState('DESC'); 
  const { repositories, fetchMore } = useRepositories(
    { first: 6 }, 
    debouncedSearchKeyword, 
    orderBy, 
    orderDirection);

  // if (loading) return <Text>'Loading...'</Text>

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
  }
  
  return (
    <RepositoryListContainer 
      repositories={repositories} 
      onEndReach={onEndReach}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: layout.containerSpacing.top,
    width: '100%'
  },
  separator: {
    height: 10,
  },
});

export default RepositoryList;