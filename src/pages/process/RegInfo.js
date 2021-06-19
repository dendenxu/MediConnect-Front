import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Header from '../components/Header';
import theme from '../../theme/theme';

const data = {
  state: false,
};

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('单号', '114514'),
  createData('科室', 'xxxx'),
  createData('医生', 'PZY'),
  createData('患者', 'aaaaaaaaah'),
  createData('时间段', '2020'),
  createData('状态', data.state ? '已完成' : '已提交'),
];

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
  },
  body: {
    padding: '10px 15px 0 15px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export default function RegInfo() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Header text="挂号详情" />
      <div className={classes.body}>
        <div>
          <Table aria-label="simple table">
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell
                    style={{
                      borderBottom: 'none',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{ borderBottom: 'none', fontSize: '18px' }}
                    align="left"
                  >
                    {row.calories}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          {data.state ? (
            <div>
              温馨提示：诊断还没开始，如果您有其他安排，可以自己取消此次会诊。
            </div>
          ) : (
            <div>
              <h5>MileStones：</h5>
              <h5>相关病例：</h5>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}
