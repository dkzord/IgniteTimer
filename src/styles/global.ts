import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme['green-500']};
  }

  html{
    @media(max-width: 1080px){
      font-sizing: 93.75%; //15px
    }
    @media(max-width: 720px){
      font-sizing: 87.5%; //14px
    }
  }

  body {
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  [disabled] {
    opacity: 0.7;
    cursor: not-allowed;
  }

  button {
    cursor: pointer;
  }
`;
