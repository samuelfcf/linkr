import styled from "styled-components"

const PageContent = styled.div` 
  display: flex;
  align-items: stretch;
  height: 100vh;

  @media(max-width: 600px) {
   flex-direction: column; 
  }
`;

const Aside = styled.aside`
  background-color: #151515;
  color: #FFFFFF;
  width: 65%;
  height: 100%;
  font-family: 'Passion One', Sans-serif;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 150px 70px;

  h1 {
    font-size: 6.625rem;
    font-weight: 700;
  }

  h3 {
    font-size: 2.688rem;
    width: 430px;
    font-weight: 400;
  }

  @media(max-width: 600px) {
   height: 175px; 
   width: 100vw;
   padding: 0;
   align-items: center;

   h1 {
     font-size: 4.75rem;
   }

   h3 {
     font-size: 23px;
     width: 237px;
     padding-left: 15px;
   }
  }
`;

const Main = styled.main`
  width: 35%;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 13px;
  }

  span {
    font-family: 'Lato', sans-serif;
    color: #FFFFFF;
    margin-top: 14px;
    text-decoration: underline;
  }

  @media(max-width: 600px) {
    width: 100vw;
    height: calc(100vh - 175px);
    justify-content: flex-start;
    padding-top: 40px;

    form {
      gap: 11px;
    }

    span {
      font-size: 17px;
    }
  }
`;

const Input = styled.input`
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  height: 6vh;
  width: 25vw;
  padding-left: 18px;
  font-size: 3vh;
  border-radius: 6px;
  border: 0;

  &::placeholder {
    color: #9F9F9F;
  }

  &:focus {
    box-shadow: 0 0 0 0;
    border: 0 none;
    outline: 0;
  }

  @media(max-width: 600px) {
    width: 330px;
    height: 55px;
  }
`;

const Button = styled.button`
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  height: 6vh;
  width: 25vw;
  background-color: #1877F2;
  border-radius: 6px;
  border: 0;
  font-size: 2.5vh;
  color: #FFFFFF;
  margin-bottom: 14px;

  @media(max-width: 600px) {
    width: 330px;
    height: 55px;
    font-size: 20px;
  }
`;

export {
  PageContent,
  Aside,
  Main,
  Input,
  Button,
}