import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

export default function MediSearch() {
  const [inputContent, setInputContent] = useState('');
  const handleSubmit = () => {
    fetch(`/api/medicine`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header text="Welcome" isRoot />
      <SearchBar
        style={{
          width: '95%',
        }}
        label="智能导诊"
        placeholder="请输入您的病症"
        inputContent={inputContent}
        setInputContent={setInputContent}
        onChange={() => {
          console.log(`Input content changed: ${inputContent}`);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
