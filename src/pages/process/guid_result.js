/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-classes-per-file */
/* eslint-disable react/prefer-stateless-function */

import { Box, createMuiTheme, Divider, List, ListItem, ListItemText, ThemeProvider, Typography } from "@material-ui/core";
import ArrowForwardIosSharpIcon from '@material-ui/icons/ArrowForwardIosSharp';
import React from "react";
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#469CDF',
            main: '#469CDF',
            dark: '#469CDF',
            contrastText: '#469CDF',
        },
        secondary: {
            main: '#0f1c49',
        },
        info: {
            main: '#878DA4',
        },
        success: {
            main: '#ffffff',
        },
        error: {
            main: "#C0C0C0"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    bar: {
        width: window.innerWidth,
        height: window.innerHeight / 8,
    },
    typography: {
        h1: {
            fontSize: 18,
        },
        h2: {
            fontSize: 14,
            textOverflow: 'ellipsis'
        }
    },
});

class DepItem extends React.Component {
    render() {
        const { data } = this.props
        return (
            <ThemeProvider theme={theme}>
                <ListItem flexDirection="row">
                    <ListItemText
                        primary={<Typography variant='h1' style={{ color: "#0f1c49", fontWeight: 'bold', marginBottom: '2vh' }} >{data.dep}</Typography>}
                        secondary={<Typography variant='h2' style={{ color: "#878DA4", fontWeight: 'bold', maxWidth: '70vw', marginBottom: '1vh', whiteSpace: "nowrap", overflowX: 'hidden' }}>{data.intro}</Typography>}
                    />
                    <Link to={data.path}>
                        <ArrowForwardIosSharpIcon fontSize='small' color='error'
                        >intro</ArrowForwardIosSharpIcon>
                    </Link>
                </ListItem>
                <Divider variant="middle" />
            </ThemeProvider>
        )
    }
}

class depList extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Box
                    display="flex"
                    flexDirection="column">
                    <Box
                        display="flex"
                        height={window.innerHeight / 10}
                        width={window.innerWidth}
                        bgcolor="primary.main"
                    >
                        <Box
                            display="flex"
                            fontSize={window.innerHeight / 30}
                            fontWeight="bold"
                            color="success.main"
                            marginY="auto"
                            marginX="3vh"
                        >
                            推荐您就诊于
                        </Box>
                    </Box>
                    <List>
                        {this.props.location.state.deps.map((data) => <DepItem key={data.id} data={data} />)}
                    </List>
                    <Box marginX='auto'
                    marginTop='3vh'>
                        <Link to='/Deps'>
                            查看所有科室
                        </Link>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

export default depList;