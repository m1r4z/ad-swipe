import React, {useState} from 'react';
import SearchIcon from '././svg-components/SearchIcon';
import RangeDatePicker from './RangeDatePicker';

const SearchBar = ({handleSearch, handleSorting, selectedDateRange, data}) =>{

    const [showCalender, setShowCalender] = useState(false);
    
    const handleDatePickerClick = () => {
        setShowCalender(!showCalender);
    }

    return (
        <>
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
                    <p className='calender-text' onClick={handleDatePickerClick}>{showCalender ? "Hide" : "Show"} Calender</p>
                </div>
            </div>
            {showCalender ? <RangeDatePicker selectedDateRange={selectedDateRange} data={data}/> : null}
        </>
    );
}

export default SearchBar;