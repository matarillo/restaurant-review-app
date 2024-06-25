// src/pages/AccountScreen.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Edit2, Trash2, Check, X } from "lucide-react";
import ReviewFormDialog from "../components/ReviewFormDialog";

// 確認ダイアログコンポーネント
const ConfirmDialog = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2 hover:bg-gray-300 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountScreen = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "鈴木一郎",
    email: "ichiro@test.com",
    icon: "https://meikyukai.jp/wp-content/uploads/2020/06/51_ichiro.jpg",
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const [userReviews, setUserReviews] = useState([
    {
      id: 0,
      restaurantName: "ガスト東岡崎店",
      rating: 2,
      comment: "値段の割に合わない気がする。\n\nチーズハンバーグを頼んだが、レトルトな感じでした。\n\nさらに、スープセットにしたが、スープは一種類。",
    },
    {
      id: 1,
      restaurantName: "デニーズ東岡崎店",
      rating: 3,
      comment: "タブレットによる注文に変わったが、慣れが必要。\n\nメニューを広げて、料理を比べたい。\n\nこの方式で価格が下がればよいが、、、",
    },
  ]);

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    // ここでログアウト処理を行う
    setIsLogoutDialogOpen(false);
    navigate("/");
  };

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setUser((prevUser) => ({ ...prevUser, name: newName }));
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setNewName(user.name);
    setIsEditingName(false);
  };

  const handleReviewDelete = (reviewId) => {
    setDeleteReviewId(reviewId);
  };

  const confirmReviewDelete = () => {
    setUserReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== deleteReviewId)
    );
    setDeleteReviewId(null);
  };

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const handleReviewEdit = (review) => {
    setEditingReview(review);
    setIsReviewFormOpen(true);
  };

  const handleReviewSubmit = (updatedReview) => {
    setUserReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === editingReview.id
          ? { ...review, ...updatedReview }
          : review
      )
    );
    setIsReviewFormOpen(false);
    setEditingReview(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
      <header className="bg-blue-500 p-4">
        <h1 className="text-white text-xl font-bold">アカウント</h1>
      </header>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-center mb-4">
            <img
              src={user.icon}
              alt={user.name}
              className="w-20 h-20 rounded-full mb-4 sm:mb-0 sm:mr-4"
            />
            <div className="flex-grow text-center sm:text-left">
              {isEditingName ? (
                <div className="flex flex-col sm:flex-row items-center">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border rounded px-2 py-1 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={handleNameSave}
                      className="text-green-500 mr-2"
                    >
                      <Check size={20} />
                    </button>
                    <button onClick={handleNameCancel} className="text-red-500">
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center sm:justify-start items-center mb-2">
                  <h2 className="text-lg font-semibold mr-2">{user.name}</h2>
                  <button onClick={handleNameEdit} className="text-blue-500">
                    <Edit2 size={16} />
                  </button>
                </div>
              )}
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded w-full hover:bg-red-600 transition-colors"
          >
            ログアウト
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-2">あなたのレビュー</h3>
        {userReviews.map((review) => (
          <div key={review.id} className="bg-white p-4 mb-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{review.restaurantName}</h4>
              <div className="flex items-center">
                <button
                  onClick={() => handleReviewEdit(review)}
                  className="text-blue-500 mr-2"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleReviewDelete(review.id)}
                  className="text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Star className="text-yellow-400 w-4 h-4 mr-1" />
              <span>{review.rating}</span>
            </div>
            <p className="text-gray-600 truncate">{review.comment}</p>
          </div>
        ))}

        <ReviewFormDialog
          isOpen={isReviewFormOpen}
          onClose={() => {
            setIsReviewFormOpen(false);
            setEditingReview(null);
          }}
          onSubmit={handleReviewSubmit}
          initialReview={editingReview}
          restaurantName={editingReview?.restaurantName}
        />
      </div>

      <ConfirmDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={confirmLogout}
        message="ログアウトしてもよろしいですか？"
      />

      <ConfirmDialog
        isOpen={deleteReviewId !== null}
        onClose={() => setDeleteReviewId(null)}
        onConfirm={confirmReviewDelete}
        message="このレビューを削除してもよろしいですか？"
      />
    </div>
  );
};

export default AccountScreen;
