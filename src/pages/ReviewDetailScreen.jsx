import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { Star, User, ArrowLeft } from 'lucide-react';

const ReviewDetailScreen = () => {
  const { restaurantId, id: reviewId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // この部分は通常、APIからデータを取得するロジックに置き換えます
  const review = {
    id: reviewId,
    restaurantName: 'ガスト東岡崎店',
    userName: '鈴木一郎',
    userIcon: 'https://meikyukai.jp/wp-content/uploads/2020/06/51_ichiro.jpg',
    rating: 2,
    comment: '値段の割に合わない気がする。\n\nチーズハンバーグを頼んだが、レトルトな感じでした。\n\nさらに、スープセットにしたが、スープは一種類。',
    date: '2023-06-22'
  };

  const handleBack = () => {
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get('from');

    if (restaurantId !== undefined && restaurantId !== null) {
      // RestaurantDetailScreenからの遷移の場合
      navigate(`/restaurant/${restaurantId}`);
    } else {
      // AllReviewsScreenからの遷移の場合
      navigate('/reviews');
    }
  };

  return (
    <div className="h-screen bg-gray-100 pb-16 overflow-y-auto">
      <header className="bg-blue-500 p-4 flex items-center">
        <button onClick={handleBack} className="text-white mr-4">
          <ArrowLeft />
        </button>
        <h1 className="text-white text-xl font-bold">レビュー詳細</h1>
      </header>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{review.restaurantName}</h2>
        <div className="flex items-center mb-4">
          <img src={review.userIcon} alt={review.userName} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <p className="font-semibold">{review.userName}</p>
            <p className="text-gray-500 text-sm">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Star className="text-yellow-400 mr-1" />
          <span className="text-xl font-bold">{review.rating}</span>
        </div>
        <p className="text-gray-700 whitespace-pre-wrap">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewDetailScreen;