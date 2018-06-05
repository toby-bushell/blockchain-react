import React from 'react';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  background-color: ${props => props.theme.white};
  border-bottom: 1px solid ${props => props.theme.dark};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .header__info {
    margin: 10px 20px;
  }
`;
