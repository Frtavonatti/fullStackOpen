import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const Search = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchKeyword}
      value={searchKeyword}
    />
  );
};

export default Search;
