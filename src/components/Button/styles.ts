import styled, { css } from 'styled-components';
import { ButtonVariant } from './typings';

interface ButtonProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
  success: 'green',
  warning: 'yellow',
};

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  width: 6.25rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  margin: 0.5rem;

  background-color: ${(props) => props.theme['green-500']};
  color: ${(props) => props.theme.white};

  /* background-color: ${(props) => buttonVariants[props.variant]};
  ${(props) => {
    return css`
      background-color: ${buttonVariants[props.variant]};
    `;
  }}
  */
`;
