import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import LoginScreen from './pages/LoginScreen';
import RestaurantListScreen from './pages/RestaurantListScreen';
import RestaurantDetailScreen from './pages/RestaurantDetailScreen';
import AllReviewsScreen from './pages/AllReviewsScreen';
import ReviewDetailScreen from './pages/ReviewDetailScreen';
import AccountScreen from './pages/AccountScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/*" element={
          <div className="h-screen flex flex-col">
            <div className="flex-grow overflow-auto">
              <Routes>
                <Route path="/home" element={<RestaurantListScreen />} />
                <Route path="/restaurant/:id" element={<RestaurantDetailScreen />} />
                <Route path="/reviews" element={<AllReviewsScreen />} />
                <Route path="/review/:id" element={<ReviewDetailScreen />} />
                <Route path="/account" element={<AccountScreen />} />
              </Routes>
            </div>
            <BottomNav />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;