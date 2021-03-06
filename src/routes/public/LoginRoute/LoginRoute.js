import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";
import UserContext from "../../../contexts/UserContext";
import { LogIn } from "../../../services/api";
import { PageContent, Aside, Main, Input, Button } from "../LoginAndSignUpStyles";

function LoginRoute() {

  const history = useHistory()
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (userLocalStorage === null) {
      return
    } else {
      const user = JSON.parse(userLocalStorage);
      setUser(user);
      history.push("/timeline");
    }
  }, []);

  function handleChange(event) {
    setInputFields({ ...inputFields, [event.target.name]: event.target.value });
  }

  function loginUser(event) {
    event.preventDefault();
    setIsLoading(true);

    if (!inputFields.email || !inputFields.password) {
      setIsLoading(false);
      return alert("Por favor, preencha todos os campos para efetuar o login!");
    }

    const body = inputFields

    LogIn(body)
      .then(res => {
        setIsLoading(false);
        const user = {
          token: res.data.token,
          ...res.data.user
        }
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        if (res.status === 200) {
          history.push("/timeline");
        }
      })
      .catch(err => {
        setIsLoading(false);
        if (err.response.status === 403 || err.response.status === 400) return alert("email/senha incorretos, tente novamente!");
      });
  }

  return (
    <PageContent>
      <Aside>
        <h1>linkr</h1>
        <h3>save, share and discover the best links on the web</h3>
      </Aside>

      <Main>
        <form onSubmit={loginUser}>
          <Input required
            type="email"
            name="email"
            value={inputFields.email}
            onChange={handleChange}
            placeholder="e-mail" />
          <Input required
            type="password"
            name="password"
            value={inputFields.password}
            onChange={handleChange}
            placeholder="password" />

          {isLoading ?
            <Button disabled>
              <Loader type="ThreeDots" color="#FFFFFF" height={15} width={70} />
            </Button> :
          <Button> Log In </Button>}

        </form>
        <Link to="/sign-up">
          <span>First time? Create an account!</span>
        </Link>
      </Main>
    </PageContent>
  );
}

export default LoginRoute;