import  styled  from 'styled-components';
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
}

export const Button = styled.button<ButtonProps>`
  width: 100px;
  height: 40px;

  background-color: ${props => buttonVariants[props.variant]};
  /* ${props => {
    return `background-color: ${buttonVariants[props.variant]};`
  }} */
`;

