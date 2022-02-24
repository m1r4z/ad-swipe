import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState , useEffect} from 'react';



const RangeDatePicker = ({selectedDateRange, data}) => {
    const [state, setState] = useState([{}]);

    useEffect(()=>{
        setState([{...data}]);
    },[data]);

    return (
        <div className='range-date-picker'>
            <DateRangePicker
                onChange={item => {setState([item.selection]); selectedDateRange(item.selection)}}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={state}
                direction="horizontal"
                />
        </div>
    );
}

export default RangeDatePicker;