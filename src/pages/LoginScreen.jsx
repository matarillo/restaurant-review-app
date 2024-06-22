import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in with:', email, password);
    } else {
      console.log('Registering with:', email, password, name);
    }
    navigate('/home');
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-bold mb-6">レストランレビューアプリ</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(true)}
          >
            ログイン
          </button>
          <button
            className={`px-4 py-2 ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(false)}
          >
            新規登録
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="メールアドレス"
            className="w-full p-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="パスワード"
            className="w-full p-2 mb-4 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="text"
              placeholder="名前"
              className="w-full p-2 mb-4 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isLogin ? 'ログイン' : '登録'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;