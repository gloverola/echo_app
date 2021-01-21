import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
${normalize}
* {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 1rem;
}
body {
  font-size: 1rem;
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: #fff;
  overscroll-behavior: none;
  overflow-x: hidden;
  transition: all 0.5s;
  width: 100vw;

}
`;
