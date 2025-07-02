import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

*,*::before,*::after{
box-sizing: border-box;
margin: 0;
padding: 0;
}

body {
font-family: 'Inter', sans-serif;
background-color: #f9fafb;
color: #222,
line-height 1.6;
font-size: 16px;
padding:0;
margin: 0;
}

h1, h2, h3 {
font-weight: 600;
margin-bottom: 1rem;
color: #111;
}

a {
color: #007bff;
text-decoration: none;
}

a:hover {
text-decoration: underline;
}

button {
font-family: inherit;
}

`

export default GlobalStyle;