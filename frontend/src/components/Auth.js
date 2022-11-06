import React, { useState } from "react";
import Style from "./modules/auth.module.css";
import axios from "axios";

const Auth = ({ setAuth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setValid(false);
      setError("Both fields are required");
      setAuth(false);
      return;
    }
    setValid(true);
    const response = await axios.get("http://localhost:5000/login", {
      params: {
        username: username,
        password: password,
      },
    });

    if (response.status === 200) {
      setAuth(true);
    }
  };

  return (
    <div className={Style.body}>
      <h1 className={Style.loginHeading}>Bitbucket repo manager</h1>
      <div className={Style.login}>
        <form onSubmit={onSubmit} className={Style.loginForm}>
          <h3>Login to bitbucket</h3>
          <input
            className={Style.inputText}
            type="text"
            placeholder="enter your consumer Key"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            className={Style.inputText}
            type="text"
            placeholder="enter your consumer Secret"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <input
            className={Style.inputSubmit}
            type="submit"
            value="LOGIN"
          ></input>
          {!valid && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Auth;
