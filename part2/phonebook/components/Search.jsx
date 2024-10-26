import React from "react";

const Search = ({ setNewSearch }) => {
    const handleSearchInput = (event) => {
        setNewSearch(event.target.value)
    }

    return ( 
        <>
            <h2>Search a person</h2>
            <input onChange={handleSearchInput} placeholder="Search..."/>
        </>
    )
}

export default Search