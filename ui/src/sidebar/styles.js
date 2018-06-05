import React from 'react';
import styled from 'styled-components';

export const SidebarWrapper = styled.ul`
  padding: ${props => props.theme.padding};
  background-color: ${props => props.theme.dark};
  color: ${props => props.theme.offWhite};
  margin-left: 0;

  li {
    margin-bottom: 10px;
    font-size: 1.3em;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.white};

    &:hover {
      text-decoration: underline;
    }

    &.active {
      color: ${props => props.theme.pink};
    }
  }
`;
