import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Sidebar from './sidebar';
import Header from './header';
import Dashboard from './dashboard';
import Mining from './mining';
import Transactions from './transactions';
import Send from './send';
import AddressGenerator from './address-generator';

// Styles
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme-styles';
import { MainWrapper, RouteWrapper } from './styles';

// Context / state
import AppContext from './context/app';
import AppProvider from './providers/app';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <div className="app">
            <Sidebar />
            <MainWrapper>
              <Header />
              <RouteWrapper>
                <Route exact path="/" component={Dashboard} />

                <AppContext.Consumer>{({ address }) => !address && <AddressGenerator />}</AppContext.Consumer>
                {/* <AppContext.Consumer>{({ address }) => <AddressGenerator />}</AppContext.Consumer> */}

                <Route exact path="/mining" component={Mining} />
                <Route exact path="/transactions" component={Transactions} />
                <Route exact path="/send" component={Send} />
              </RouteWrapper>
            </MainWrapper>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;
