import * as S from "./styles";
import { ButtonVariant } from './typings';

interface ButtonProps {
  variant?: ButtonVariant;
}

export function Button({variant = 'primary'}: ButtonProps) {
  return (
    <S.Button variant={variant}>
      Enviar
    </S.Button>
  );
}