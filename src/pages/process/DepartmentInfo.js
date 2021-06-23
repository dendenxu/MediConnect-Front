import React, { useState } from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useLocation } from 'react-router';
import Header from '../components/Header';
import theme from '../../theme/theme';

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
  bodybutton: {
    marginTop: '20px',
  },
}));

export default function DepartmentInfo() {
  const [inputDate, setInputDate] = useState('2021-06-24T10:30');
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  // const location = {
  //   state: {
  //     data: {
  //       name: 'a',
  //       detail: 'b',
  //       doctors: ['a', 's'],
  //       id: 1,
  //     },
  //   },
  // };

  console.log(location);

  const handleClick = () => {
    console.log(inputDate);
    const depid = location.state.data.id;
    const fulldate = new Date(inputDate);
    const ryear = fulldate.getFullYear();
    const rmonth = fulldate.getMonth() + 1;
    const rdate = fulldate.getDate();
    const rhalfday = fulldate.getHours() < 12 ? 'morning' : 'afternoon';
    const url = `/api/registrations`;
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department_id: depid,
        year: ryear,
        month: rmonth,
        day: rdate,
        halfday: rhalfday,
      }),
    })
      .then(res => res.json())
      .then(rdata => {
        console.log(rdata);
        if (rdata.status === 'error') {
          history.push({
            pathname: '/reg-result',
            state: {
              data: {
                reason: rdata.data,
              },
            },
          });
        } else {
          fetch(`/api/department/${depid}`, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(depinfo => {
              console.log(depinfo);
              fetch('/api/registration/1', {
                method: 'get',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then(res => res.json())
                .then(reginfo => {
                  console.log(reginfo);
                  history.push({
                    pathname: '/reg-result',
                    state: {
                      data: {
                        dep: depinfo.data.name,
                        doc: reginfo.data.doctor,
                        name: reginfo.data.patient,
                        year: ryear,
                        mon: rmonth,
                        day: rdate,
                        tim: rhalfday === 'morning' ? 0 : 1,
                      },
                    },
                  });
                });
            });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Header text={location.state.data.name} />
      <div className={classes.body}>
        <div>
          <h5>科室介绍</h5>
          <p>{location.state.data.detail}</p>
          <h5>医生</h5>
          <p>
            {location.state.data.doctors.map(doctor => (
              <li key={doctor}>{doctor}</li>
            ))}
          </p>
        </div>
        <div>
          <h5>预约挂号时段</h5>
          <form noValidate>
            <TextField
              id="datetime-reg"
              label="挂号时间"
              type="datetime-local"
              defaultValue={inputDate}
              onChange={e => {
                setInputDate(e.target.value);
                console.log(e.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={classes.bodybutton}>
              <Button variant="contained" color="primary" onClick={handleClick}>
                确认
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}
