import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const {addRestaurants} = useContext(RestaurantsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await RestaurantFinder.post("/", {
                name: name,
                location: location,
                price_range: priceRange
            });
            addRestaurants(response.data.data.restaurant);
            console.log(response);
        }
        catch (err){

        }
    }
    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit} action="">
                <div className="form-group row">
                    <div className="col">
                        <input 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            type="text" 
                            className="form-control" 
                            placeholder="name"
                        />
                    </div>
                    <div className="col">
                        <input 
                            value={location} 
                            onChange={e => setLocation(e.target.value)}  
                            type="text" className="form-control" 
                            placeholder="location"
                        />
                    </div> 
                    <div className="col">
                        <select 
                            className="form-select my-1 mr-sm-2" 
                            value={priceRange} 
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            <option disabled>Price Range</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button className="btn btn-primary col">Add</button>
                </div> 
            </form>
        </div>
    )
}

export default AddRestaurant