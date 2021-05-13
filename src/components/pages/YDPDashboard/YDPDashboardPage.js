import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import YDPNavBar from '../../common/YDPNavBar';
import { Button } from 'antd';

const StyledYDPPage = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledLink = styled(Link)`
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

function RenderHomePage() {
  return (
    <>
      <YDPNavBar titleName="YDP Dashboard" backgroundColor="#293845" />
      <StyledYDPPage>
        <h2 style={{ textAlign: 'center' }}>I want to...</h2>
        <StyledLink to="/scanner">
          <StyledButton size="large" type="primary">
            Check In
          </StyledButton>
        </StyledLink>
        <StyledButton size="large" type="primary">
          Choose Event
        </StyledButton>
        <StyledLink to="/scanner">
          <StyledButton size="large" type="primary">
            Check Out
          </StyledButton>
        </StyledLink>
      </StyledYDPPage>
    </>
  );
}
export default RenderHomePage;