import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Routes
import Home from './routes/Home';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import UpdatePage from './routes/UpdatePage';

//Context
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path='/' element={<Home/>} />
                        <Route exact path='/restaurants/:id/update' element={<UpdatePage/>} />
                        <Route exact path='/restaurants/:id' element={<RestaurantDetailPage/>} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    );
};

export default App;