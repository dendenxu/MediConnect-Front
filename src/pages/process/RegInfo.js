import React, { useState, useEffect } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router';

import Header from '../components/Header';
import theme from '../../theme/theme';

function createData(name, calories) {
  return { name, calories };
}

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
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px 10px 0 15px',
  },
  bottomtext: {
    width: '65%',
  },
  bottombutton: {
    marginLeft: '15px',
    width: '30px',
  },
}));

export default function RegInfo() {
  const classes = useStyles();
  const location = useLocation();
  const [regData, setRegData] = useState({});
  const history = useHistory();

  useEffect(async () => {
    await fetch(`/api/registration/${location.state}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        setRegData(data.data);
      }); // console.log(result)
  }, []);

  let { status } = regData;

  if (status === 'committed') status = '已提交';
  else if (status === 'accepted') status = '进行中';
  else if (status === 'terminated') status = '已结束';
  else status = '';

  const handleClick = () => {
    const url = `/api/registration/${regData.id}`;
    fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'terminated',
        terminatedCause: 'cancel',
      }),
    })
      .then(res => res.json())
      .then(rdata => {
        console.log(rdata);
        if (rdata.status === 'ok') {
          setRegData({ ...regData, status: 'terminated' });
          console.log(regData);
        }
      });
  };

  const handleEnterChat = () => {
    history.push({
      pathname: '/ChatPatient',
      state: {
        data: {
          doctorID: regData.doctor_id,
          doctorName: regData.doctor,
        },
      },
    });
  };

  const rows = [
    createData('单号', regData.id),
    createData('科室', regData.department),
    createData('医生', regData.doctor),
    createData('患者', regData.patient),
    createData(
      '时间段',
      `${regData.year}-${regData.month}-${regData.day} ${
        regData.halfday === 'morning' ? '上午' : '下午'
      }`,
    ),
    createData('状态', status),
  ];

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
          {regData.status === 'committed' ? (
            <div className={classes.bottom}>
              <div className={classes.bottomtext}>
                温馨提示：诊断还没开始，如果您有其他安排，可以自己取消此次会诊。
              </div>
              <Button
                className={classes.bottombutton}
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                取消
              </Button>
            </div>
          ) : (
            <div>
              <h3>MileStones：</h3>
              <h3>相关病历：</h3>
            </div>
          )}
        </div>
      </div>
      <Button
        className={classes.bottombutton}
        variant="contained"
        color="secondary"
        onClick={handleEnterChat}
      >
        开始会话
      </Button>
    </ThemeProvider>
  );
}
