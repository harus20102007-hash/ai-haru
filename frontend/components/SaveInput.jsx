import React, { useState, useEffect } from 'react';

const SaveInput = () => {
  const [input, setInput] = useState('');

  // ローカルストレージから読み込む
  useEffect(() => {
    const savedInput = localStorage.getItem('userInput');
    if (savedInput) {
      setInput(savedInput);
    }
  }, []);

  // 入力値を保存
  const handleSave = () => {
    localStorage.setItem('userInput', input);
    alert('入力が保存されました！');
  };

  return (
    <div>
      <label>情報を入力してください:</label>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleSave}>保存</button>
    </div>
  );
};

export default SaveInput;