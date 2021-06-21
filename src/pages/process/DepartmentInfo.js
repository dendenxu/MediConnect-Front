import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import theme from '../../theme/theme';

const deptinfo = [
  {
    detail: '无语凝噎',
    id: 0,
    name: '太平间',
  },
];

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
  },
  body: {
    padding: '5px 15px 0 15px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
}));

export default function DepartmentInfo() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <Header text={deptinfo[0].name} />
      <div className={classes.body}>
        <div>
          <h5>科室介绍</h5>
          <p>{history.location.state.data.detail}</p>
          <h5>主治病症</h5>
          <p>aa</p>
          <h5>医生</h5>
          <p>aa</p>
        </div>
        <div>
          <h5>预约挂号时段</h5>
          <form noValidate>
            <TextField
              id="datetime-reg"
              label="挂号时间"
              type="datetime-local"
              defaultValue="2020-05-24T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}
