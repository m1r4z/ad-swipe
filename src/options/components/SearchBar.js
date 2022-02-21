import React from 'react';
import SearchIcon from '././svg-components/SearchIcon';

const SearchBar = ({handleSearch, handleSorting}) =>{
    return (
        <div className='searchbar-container'>
            <div className='search-input-container'>
                <span><SearchIcon /></span>
                <input placeholder='Search' onChange={(e)=>handleSearch(e)} />
                <select name="sort" id="ad-sort" onChange={(e)=>handleSorting(e)}>
                    <option value="oldest">Oldest</option>
                    <option value="latest">Latest</option>
                    <option value="likes">Likes</option>
                    <option value="comments">Comments</option>
                    <option value="shares">Shares</option>
                </select>
            </div>
        </div>
    );
}

export default SearchBar;