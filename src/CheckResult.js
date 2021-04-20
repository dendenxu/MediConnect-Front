import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./index.css";
import { Box, Button } from "@material-ui/core";
import Result from "./result";
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Box display="flex" bgcolor="lightblue" height={window.innerHeight}>
              <Box m="auto">
                <Link
                  to={{
                    pathname: "/result",
                    state: {
                      // 页面跳转要传递的数据，如下
                      /*
                                            data1: {
                                                doc: '子沐',
                                                name: '子曰',
                                                dep: '推拿房',
                                                year: 1999,
                                                mon: 1,
                                                day: 1,
                                                tim: 0
                                            }*/
                      data1: {
                        reason: "当天无可安排医生",
                      },
                    },
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="contained" color="primary">
                    挂号
                  </Button>
                </Link>
              </Box>
            </Box>
          </Route>
          <Route path="/result" component={Result}></Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
