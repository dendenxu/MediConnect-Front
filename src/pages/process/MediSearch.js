import React, { useState } from 'react';
import { useTheme } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

export default function MediSearch() {
  const theme = useTheme();
  const history = useHistory();
  const [inputContent, setInputContent] = useState('');

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
          marginTop: theme.spacing(2),
        }}
        label="智能导诊"
        placeholder="请输入您的病症"
        inputContent={inputContent}
        setInputContent={setInputContent}
        onChange={() => {
          console.log(`Input content changed: ${inputContent}`);
        }}
        onSubmit={() => {
          history.push({
            pathname: '/guide-result',
            state: inputContent,
          });
        }}
      />
    </div>
  );
}
