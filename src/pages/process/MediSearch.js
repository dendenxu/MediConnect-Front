import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

export default function MediSearch() {
  const [inputContent, setInputContent] = useState('');

  return (
    <SearchBar
      label="智能导诊"
      placeholder="请输入您的病症"
      inputContent={inputContent}
      setInputContent={setInputContent}
      onChange={() => {
        console.log(`Input content changed: ${inputContent}`);
      }}
      onSubmit={() => {
        console.log(`Submitting ${inputContent}`);
      }}
    />
  );
}
