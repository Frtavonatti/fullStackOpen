import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Search = ({ searchKeyword, setSearchKeyword, ...props }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchKeyword}
      value={searchKeyword}
      style={styles.search}
      inputStyle={styles.input}
      theme={{ colors: { surfaceVariant: 'transparent' } }}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  search: {
    width: '95%',
    marginBottom: 5,
    minHeight: 35,
    maxHeight: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    minHeight: 35,
    maxHeight: 35,
    paddingVertical: 0,
    textAlignVertical: 'center',
    lineHeight: 35,
  }
});

export default Search;