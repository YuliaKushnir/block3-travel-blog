import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate,} from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import * as pages from 'constants/pages';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import pageURLs from 'constants/pagesURLs';
import SecretPage from 'pageProviders/Secret';
import ThemeProvider from 'misc/providers/ThemeProvider';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';
import { fetchProfile } from 'app/actions/user';
import FiltersProvider from 'misc/providers/FiltersProvider';
import Notification from 'pages/secret/component/Notification';

function App() {
  const [componentDidMount, setComponentDidMount] = useState(false);

  const dispatch = useDispatch();
  const { isFetchingUser, isAuthenticated } = useSelector(s => s.user);

  useEffect(() => {
    dispatch(fetchProfile());
    setComponentDidMount(true); 
  }, [dispatch]);

  return (
    <ThemeProvider>
      <FiltersProvider>
        <Notification/>
        <BrowserRouter>
          <SearchParamsConfigurator/>
          {(!componentDidMount || isFetchingUser) ? (
            <Loading/>
          ) : (
            <IntlProvider>
              <Header/>
                <Routes>
                  {!isAuthenticated ? (
                    <Route element={<Navigate to="/login" replace />} path='*' /> 
                  ) : (
                    <>
                      {/* <Route element={<Login />} path='/login' /> */}
                      <Route element={<DefaultPage />} path={`${pageURLs[pages.defaultPage]}`} />
                      <Route element={<SecretPage />} path={`${pageURLs[pages.secretPage]}/new`} />
                      <Route element={<SecretPage />} path={`${pageURLs[pages.secretPage]}/:id`} />
                      <Route element={( <LoginPage/> )} path={`${pageURLs[pages.login]}`} />
                      <Route element={( <MissedPage redirectPage={`${pageURLs[pages.defaultPage]}`} /> )} path="*" />
                    </>
                  )}
                </Routes>
            </IntlProvider>
          )}
        </BrowserRouter>

      </FiltersProvider>
    </ThemeProvider>
  )
}

export default App;