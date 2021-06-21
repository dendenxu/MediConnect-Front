import {
  Divider,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  primaryText: {
    color: '#0f1c49',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '1.5vh',
  },
  secondaryText: {
    fontSize: 14,
    textOverflow: 'ellipsis',
    color: '#878DA4',
    fontWeight: 'bold',
    maxWidth: '70vw',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
}));

export default function DepartmentItem(props) {
  const history = useHistory();
  const location = useLocation();
  const { primaryText, secondaryText } = useStyles();
  const { data } = props;

  // const handleClick = async (id) =>{
  //   const url=`/api/department/${id}`;
  //   let depInfo={};
  //   const response = await fetch(url, {
  //     method: 'get',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(res=>res.json()).then(rdata=>{
  //     depInfo=rdata;
  //     history.push({
  //       pathname: '/departmentinfo',
  //       state: depInfo,
  //     });
  //   });
  // };

  return (
    <div>
      <ListItem
        button
        onClick={() => {
          const url = `/api/department/${data.id}`;
          let depInfo = {};
          fetch(url, {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(rdata => {
              depInfo = rdata;
              history.push({
                pathname: '/departmentinfo',
                state: depInfo,
              });
            });
        }}
        // flexDirection="row"
      >
        <ListItemText
          primary={<Typography className={primaryText}>{data.name}</Typography>}
          secondary={
            <Typography className={secondaryText}>{data.detail}</Typography>
          }
        />
        <ArrowForwardIosSharpIcon fontSize="small" color="secondary">
          intro
        </ArrowForwardIosSharpIcon>
      </ListItem>
      <Divider variant="middle" />
    </div>
  );
}
