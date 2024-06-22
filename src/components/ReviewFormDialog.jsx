import React, { useState, useEffect } from 'react';
import { Star, X } from 'lucide-react';

const ReviewFormDialog = ({ isOpen, onClose, onSubmit, initialReview = null, restaurantName = '' }) => {
  const [rating, setRating] = useState(initialReview ? initialReview.rating : 0);
  const [comment, setComment] = useState(initialReview ? initialReview.comment : '');

  useEffect(() => {
    if (isOpen) {
      setRating(initialReview ? initialReview.rating : 0);
      setComment(initialReview ? initialReview.comment : '');
    }
  }, [isOpen, initialReview]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{initialReview ? 'レビューを編集' : 'レビューを追加'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {restaurantName || '店舗名'}
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              評価
            </label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`mr-1 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
              コメント
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2 hover:bg-gray-300 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              {initialReview ? '更新' : '投稿'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormDialog;
