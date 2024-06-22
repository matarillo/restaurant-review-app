import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import ReviewFormDialog from '../components/ReviewFormDialog';

const RestaurantDetailScreen = () => {
  const { id } = useParams();
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  
  // この部分は通常、APIからデータを取得するロジックに置き換えます
  const restaurant = {
    id: id,
    name: 'ガスト東岡崎店',
    type: '洋食',
    address: '愛知県岡崎市大西１丁目１−１０',
    rating: 3.3,
    image: 'https://www.skylark.co.jp/site_resource/gusto/images/logo.svg',
  };

  const [reviews, setReviews] = useState([
    { 
      id: 0, 
      userName: '鈴木一郎', 
      userIcon: 'https://meikyukai.jp/wp-content/uploads/2020/06/51_ichiro.jpg',
      rating: 2, 
      comment: '値段の割に合わない気がする。' 
    },
    { 
      id: 1, 
      userName: '佐藤二郎', 
      userIcon: 'http://www.from1-pro.jp/images/t_10/img_l.jpg?1597426029',
      rating: 3, 
      comment: 'タブレットによる注文に変わったが、慣れが必要。' 
    },
  ]);

  const handleReviewSubmit = (newReview) => {
    // 通常はここでAPIを呼び出してレビューを保存します
    const reviewToAdd = {
      id: reviews.length, // 実際のアプリではサーバーサイドでIDを生成します
      userName: 'ログインユーザー', // 実際のアプリではログインユーザーの情報を使用します
      userIcon: 'https://example.com/user-icon.jpg',
      ...newReview
    };
    setReviews([...reviews, reviewToAdd]);
    setIsReviewFormOpen(false);
  };

  return (
    <div className="h-screen bg-gray-100 pb-16 overflow-y-auto">
      <header className="bg-blue-500 p-4">
        <h1 className="text-white text-xl font-bold">{restaurant.name}</h1>
      </header>
      <div className="p-4">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <p className="text-gray-600">{restaurant.type}</p>
        <p className="text-gray-600">{restaurant.address}</p>
        <div className="flex items-center mt-2 mb-4">
          <Star className="text-yellow-400 mr-1" />
          <span>{restaurant.rating.toFixed(1)}</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">レビュー</h2>
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-4 mb-4 rounded-lg shadow">
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
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
        <button
          onClick={() => setIsReviewFormOpen(true)}
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors"
        >
          レビューを追加
        </button>
      </div>

      <ReviewFormDialog
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
        onSubmit={handleReviewSubmit}
        restaurantName={restaurant.name}
      />
    </div>
  );
};

export default RestaurantDetailScreen;