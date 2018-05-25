import React from 'react';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import {Route, Switch, Redirect} from 'react-router-dom';

import {Header, Footer, Sidebar} from 'components';

import dashboardRoutes from 'routes/dashboard.jsx';
import FullScreenMap from '../../views/Maps/Maps';

var ps;

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      myRequests: null,
        account: null
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf('Win') > -1) {
      ps.destroy();
      document.body.classList.toggle('perfect-scrollbar-on');
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === 'PUSH') {
      this.refs.mainPanel.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }

  updateRequests(myRequests) {
    this.setState({myRequests: myRequests});
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} routes={dashboardRoutes} />
        <div className="main-panel" ref="mainPanel">
          {this.state.myRequests ? (
            <Header account={this.state.account} myRequests={this.state.myRequests} {...this.props}/>
          ) : null}

          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.collapse) {
                return prop.views.map((prop2, key2) => {
                  return (
                    <Route
                      path={prop2.path}
                      component={prop2.component}
                      key={key2}
                    />
                  );
                });
              }
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
              if (prop.path.toString().includes('web3')) {
                return (
                  <Route
                    path={prop.path}
                    exact
                    key={key}
                    render={props => (
                      <FullScreenMap
                        updateMyRequests={async myRequests => {
                          this.updateRequests(myRequests);
                        }}
                        updateAccount={async account => {
                          this.setState({account: account})
                        }}
                        {...props}
                      />
                    )}
                  />
                );
              } else {
                return (
                  <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                  />
                );
              }
            })}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

export default Dashboard;
