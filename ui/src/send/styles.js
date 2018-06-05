import React, { Component } from 'react';
import styled from 'styled-components';

export const ErrorsStyled = styled.div`
  margin-bottom: ${props => props.theme.padding};

  p {
    color: red;
    margin-bottom: 5px;
  }
`;
