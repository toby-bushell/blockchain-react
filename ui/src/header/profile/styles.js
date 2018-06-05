import React from 'react';
import styled from 'styled-components';

export const ProfileDiv = styled.div`
  height: 100%;
  border-left: 1px solid ${props => props.theme.dark};
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${props => props.theme.pink};

    path {
      fill: ${props => props.theme.white};
    }
  }

  svg {
    height: calc(100% - 20px);
    width: auto;
    padding: 10px;
  }
`;

export const ProfileMenu = styled.ul`
    position: absolute;
    margin: 0;
    right: 0;
    min-width: 150px;
    max-width: 250px;
    top: 100%;
    background-color: ${props => props.theme.white};
    padding: 20px;
    border-left: 1px solid ${props => props.theme.dark};
    border-bottom: 1px solid ${props => props.theme.dark};
    border-top: 1px solid ${props => props.theme.dark};

    li {
      list-style: none;
      padding: 5px 0;
    }
}
`;
