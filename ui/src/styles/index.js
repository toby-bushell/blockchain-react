import styled from 'styled-components';

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const RouteWrapper = styled.div`
  padding: 40px;
  background-color: #ebf1f5;
  flex: 1;
`;

export const Button = styled.button`
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

export const SubmitButton = Button.withComponent('input');
