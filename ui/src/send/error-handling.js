import React, { Component } from 'react';
import { param } from 'express-validator/check';
import { ErrorsStyled } from './styles';

const ErrorHandler = ({ errors }) => {
  let formattedErrors = '';

  if (!errors) return;

  Object.keys(errors)
    .filter(key => errors[key].hasOwnProperty('msg'))
    .map((key, i) => console.log('looping boom?', key, errors[key]));

  const ParamFormatted = ({ param }) => {
    const result = param.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

    return `${finalResult}: `;
  };

  return (
    <ErrorsStyled>
      {Object.keys(errors)
        .filter(key => errors[key].hasOwnProperty('msg'))
        .map((key, i) => {
          const { param, msg } = errors[key];

          return (
            <p class="error-message" key={i}>
              <ParamFormatted param={param} /> {msg}
            </p>
          );
        })}
    </ErrorsStyled>
  );
};

export default ErrorHandler;
