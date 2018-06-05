import styled from 'styled-components';

export const FormStyled = styled.form`
  input:not([type='submit']) {
    padding: 10px;
    background-color: ${props => props.theme.white};
    min-width: 225px;
  }

  input {
    display: block;
    margin-bottom: ${props => props.theme.padding};
  }

  input::placeholder {
    font-size: 14px;
  }

  .label-hidden {
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
`;

export const RouteWrapper = styled.div`
  padding: 40px;
  background-color: #ebf1f5;
  flex: 1;
`;
