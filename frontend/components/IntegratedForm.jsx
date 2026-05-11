import React, { useState, useEffect } from 'react';

const IntegratedForm = () => {
  const [text, setText] = useState('');
  const [voiceInput, setVoiceInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  // ローカルストレージから読み込む
  useEffect(() => {
    const savedInput = localStorage.getItem('userInput');
    if (savedInput) {
      setText(savedInput);
    }
  }, []);

  // テキストを保存
  const handleSave = () => {
    localStorage.setItem('userInput', text);
    alert('入力が保存されました！');
  };

  // 音声認識を開始
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('このブラウザは音声入力をサポートしていません。');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setVoiceInput(transcript);
      setText((prevText) => prevText + transcript); // テキストに追加
    };

    recognition.onerror = (error) => {
      console.error('音声認識エラー:', error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div>
      <h2>統合フォーム</h2>
      <label>テキスト入力:</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="4"
        cols="50"
      />
      <div>
        <button onClick={handleSave}>保存</button>
      </div>
      <div>
        <label>音声入力:</label>
        <button onClick={startVoiceRecognition} disabled={isRecording}>
          {isRecording ? '録音中...' : '音声入力開始'}
        </button>
        <p>音声認識結果: {voiceInput}</p>
      </div>
    </div>
  );
};

export default IntegratedForm;