import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const RestaurantListScreen = () => {
  const restaurants = [
    { 
      id: 0, 
      name: 'ガスト東岡崎店', 
      type: '洋食', 
      rating: 3.3,
      image: 'https://www.skylark.co.jp/site_resource/gusto/images/logo.svg'
    },
    { 
      id: 1, 
      name: 'デニーズ東岡崎店', 
      type: '洋食', 
      rating: 3.7,
      image: 'https://sozainavi.com/wp-content/uploads/2019/10/dennys.jpg'
    },
    { 
      id: 2, 
      name: '大戸屋ごはん処岡崎店', 
      type: '和食', 
      rating: 4.0,
      image: 'https://sozainavi.com/wp-content/uploads/2019/10/ootoya.jpg'
    },
    { 
      id: 3, 
      name: '和食さと岡崎店', 
      type: '和食', 
      rating: 3.8,
      image: 'https://sato-res.com/assets/tile/sato.png'
    },
    // ... other restaurants
  ];

  return (
    <div className="h-screen bg-gray-100 pb-16 overflow-y-auto">
      <header className="bg-blue-500 p-4">
        <h1 className="text-white text-xl font-bold">レストラン一覧</h1>
      </header>
      <div className="p-4">
        {restaurants.map((restaurant) => (
          <Link 
            key={restaurant.id} 
            to={`/restaurant/${restaurant.id}`}
            className="block bg-white p-4 mb-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-20 h-20 object-cover rounded-lg mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                <p className="text-gray-600">{restaurant.type}</p>
                <div className="flex items-center mt-2">
                  <Star className="text-yellow-400 w-4 h-4 mr-1" />
                  <span>{restaurant.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RestaurantListScreen;