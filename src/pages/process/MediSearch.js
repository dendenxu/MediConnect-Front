import React, { useState } from 'react';
import { useTheme } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

export default function MediSearch() {
  const theme = useTheme();
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
        // width: '100%',
        // margin: theme.spacing(1),
      }}
    >
      <Header text="Welcome" isRoot />
      <SearchBar
        style={{
          width: '95%',
          marginTop: theme.spacing(2),
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
