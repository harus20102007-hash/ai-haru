import React, { useState } from 'react';

const VoiceInput = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('このブラウザは音声入力をサポートしていません。');
      return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'ja-JP'; // 日本語を指定
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
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
      <label>音声入力:</label>
      <div>
        <button onClick={startRecognition} disabled={isRecording}>
          {isRecording ? '録音中...' : '音声入力開始'}
        </button>
      </div>
      <p>認識結果: {transcript}</p>
    </div>
  );
};

export default VoiceInput;