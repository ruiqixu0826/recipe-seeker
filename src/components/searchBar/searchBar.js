import { useState } from 'react';
import './searchBar.css'

const SearchBar = () => {
    const [advSearch, setAdvanced] = useState(false);
    const [maxTime, setMaxTime] = useState('45');

    const toggleAdvancedSearch = (e) => {
        if(!e.target.checked){
            setMaxTime('45');
        }
        setAdvanced(e.target.checked);
    }

    const sliderChange = (e) => {
        setMaxTime(e.target.value);
    }

    return(
        <>
        <div className='container'>
            <div className='row my-2'>
                <div className='search-bar'>
                    <input type='text' className="form-control form-control-lg rounded-pill" placeholder="Search Recipes..." aria-label="Search"></input>
                </div>
            </div>
            <div className='row m-0'>
                <div className='form-check'>
                    <input type='checkbox' className='d-flex form-check-input' onChange={toggleAdvancedSearch}></input>
                    <label>Advanced Search</label>
                </div>
            </div>
            <div className='row mt-3'>
                {advSearch ? 
                (<>
                <label className='form-label'>Maximum Ready Time</label>
                <strong>{maxTime<195 ? `${maxTime} mins` :'No Limit'}</strong>
                <div><input type='range' className='form-range' min='15' max='195' step='15' onChange={sliderChange}></input></div>

                <div>
                    <label className='form-label'>Dietary Preferences</label>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input'></input>
                        <label>Gluten-Free</label>
                    </div>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input'></input>
                        <label>Lactose-Free</label>
                    </div>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input'></input>
                        <label>Vegan</label>
                    </div>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input'></input>
                        <label>Ovo-Vegetarian</label>
                    </div>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input'></input>
                        <label>Vegetarian</label>
                    </div>
                </div>
                </>)
                :<></>}
            </div>
            <div className='row d-flex m-0 justify-content-center'>
                <div className='col-3'>
                    <button className="btn w-100 btn-primary rounded-pill" type="button" id="button-addon2">Search</button>
                </div>
                
            </div>
            
        </div>
        
        
        
        </>
    );
}

export default SearchBar;