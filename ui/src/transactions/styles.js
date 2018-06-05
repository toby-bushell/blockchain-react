import React, { Component } from 'react';
import styled from 'styled-components';

export const TransactionTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 40px;

  tr:nth-child(2n) {
    background-color: ${props => props.theme.white};
  }
  thead {
    border-bottom: 1px solid ${props => props.theme.dark};
  }
  td,
  th {
    padding: 10px;
    text-align: left;
  }

  ${'' /* th:first-of-type,
  td:first-of-type {
    padding-left: 0;
  } */};
`;

export const TransactionWrapper = styled.div`
  margin-bottom: 40px;
`;

export const NoTransactionMessage = styled.p`
  padding: 10px 0;
  color: ${props => props.theme.grey};
`;
