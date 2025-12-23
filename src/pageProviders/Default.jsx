import DefaultPage from 'pages/default';
import React from 'react';
import MainPageContainer from './components/MainPageContainer';

const Default = (props) => {

  return (
    <MainPageContainer>
      <DefaultPage {...props} />
    </MainPageContainer>
  );
};

export default Default;
