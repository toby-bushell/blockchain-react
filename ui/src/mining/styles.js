import React from 'react';
import styled from 'styled-components';

export const MiningSectionDiv = styled.div`
  display: flex;
  padding-bottom: ${props => props.theme.padding};
  border-bottom: 1px solid ${props => props.theme.dark};
`;

const MiningButtonTemp = styled.button`
  padding: 1.25em 2em;
  border-radius: 0;
  background-color: ${props => props.theme.pink};
  border: none;
  color: ${props => props.theme.white};
  cursor: pointer;
  transition: background-color 0.2s ease-out;
  min-width: 110px;

  &:hover {
    background-color: ${props => props.theme.dark};
  }
`;
MiningButtonTemp.displayName = 'MiningButton';

export const MiningButton = MiningButtonTemp;

export const BlockInfoDiv = styled.div`
  padding: 0 ${props => props.theme.padding};
  flex: 0 1 300px;
  color: ${props => (props.mined ? 'inherit' : 'grey')}

  margin-left: ${props => props.theme.padding};
  border-left: 1px solid ${props => props.theme.dark};
`;

export const PickAxeStyled = styled.div`
  width: 100px;
  height: 100px;
  padding-bottom: 20px;

  svg {
    transform-origin: 0% 100%;
  }

  @keyframes mine {
    0% {
      transform: rotate(0);
    }
    25% {
      transform: rotate(25deg);
    }
    50% {
      transform: rotate(5deg);
    }
    75% {
      transform: rotate(25deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  ${({ animate }) =>
    animate &&
    `
    svg {
        animation: mine 1s ease-out 0s infinite;
    }
  `};
`;
