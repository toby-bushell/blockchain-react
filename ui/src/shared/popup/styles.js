import React from 'react';
import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.overlay};
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ active }) =>
    !active &&
    `
    display: none;
  `};
`;

export const PopupDiv = styled.div`
  width: 400px;
  max-width: calc(100% - 40px);
  padding: 40px;
  background-color: ${props => props.theme.white};
  text-align: center;
`;
