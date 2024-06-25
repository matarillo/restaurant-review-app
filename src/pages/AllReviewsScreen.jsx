// src/pages/AllReviewsScreen.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, ChevronUp, ChevronDown, Filter, X } from 'lucide-react';

const AllReviewsScreen = () => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const reviews = [
    { 
      id: 0, 
      restaurantName: 'ガスト東岡崎店', 
      userName: '鈴木一郎', 
      userIcon: 'https://meikyukai.jp/wp-content/uploads/2020/06/51_ichiro.jpg',
      rating: 2, 
      comment: '値段の割に合わない気がする。\n\nチーズハンバーグを頼んだが、レトルトな感じでした。\n\nさらに、スープセットにしたが、スープは一種類。' 
    },
    { 
      id: 1, 
      restaurantName: 'デニーズ東岡崎店', 
      userName: '佐藤二郎', 
      userIcon: 'http://www.from1-pro.jp/images/t_10/img_l.jpg?1597426029',
      rating: 3, 
      comment: 'タブレットによる注文に変わったが、慣れが必要。\n\nメニューを広げて、料理を比べたい。\n\nこの方式で価格が下がればよいが、、、' 
    },
    { 
      id: 2, 
      restaurantName: '大戸屋ごはん処岡崎店', 
      userName: '田中三郎', 
      userIcon: 'https://example.com/tanaka.jpg',
      rating: 4, 
      comment: '健康的な和食が楽しめる。野菜が新鮮。' 
    },
    { 
      id: 3, 
      restaurantName: 'スシロー岡崎上和田店', 
      userName: '山田花子', 
      userIcon: 'https://example.com/yamada.jpg',
      rating: 5, 
      comment: 'コスパ最高！ネタも新鮮で美味しい。' 
    },
    // ... other reviews
  ];

  const toggleRating = (rating) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setSelectedRatings([]);
    setIsFilterExpanded(false);
  };

  const filteredReviews = selectedRatings.length === 0
    ? reviews
    : reviews.filter(review => selectedRatings.includes(review.rating));

  useEffect(() => {
    const handleScroll = () => {
      const filterElement = document.getElementById('floating-filter');
      if (filterElement) {
        filterElement.style.top = `${Math.max(0, 56 - window.scrollY)}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-10">
        <h1 className="text-white text-xl font-bold">全レビュー</h1>
      </header>
      <div id="floating-filter" className="fixed left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out z-20" style={{ top: '56px' }}>
        <div className="max-w-sm mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center py-2 text-gray-700 font-medium"
            >
              <Filter size={20} className={`mr-2 ${selectedRatings.length > 0 ? 'text-blue-500' : 'text-gray-500'}`} />
              <span>評価でフィルター</span>
              {selectedRatings.length > 0 && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                  {selectedRatings.length}
                </span>
              )}
            </button>
            <div className="flex items-center">
              {selectedRatings.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="mr-2 text-sm text-blue-500 hover:text-blue-700"
                >
                  クリア
                </button>
              )}
              <button onClick={() => setIsFilterExpanded(!isFilterExpanded)}>
                {isFilterExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>
          </div>
          {isFilterExpanded && (
            <div className="py-2 flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => toggleRating(rating)}
                  className={`px-3 py-1 rounded ${
                    selectedRatings.includes(rating)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="pt-28 px-4">
        {filteredReviews.map((review) => (
          <Link 
            key={review.id} 
            to={`/review/${review.id}`}
            state={{ from: '/reviews' }}
            className="block bg-white p-4 mb-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold mb-2">{review.restaurantName}</h2>
            <div className="flex items-center mb-2">
              <img src={review.userIcon} alt={review.userName} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <p className="font-medium">{review.userName}</p>
                <div className="flex items-center">
                  <Star className="text-yellow-400 w-4 h-4 mr-1" />
                  <span>{review.rating}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 truncate">{review.comment}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllReviewsScreen;