import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Routes
import Home from './routes/Home';
import RestaurantDetail from './routes/RestaurantDetail';
import UpdateRestaurant from './routes/UpdateRestaurant';

//Context
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Home/>} />
                        <Route exact path='/restaurants/:id/update' element={<UpdateRestaurant/>} />
                        <Route exact path='/restaurants/:id' element={<RestaurantDetail/>} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    );
};

export default App;