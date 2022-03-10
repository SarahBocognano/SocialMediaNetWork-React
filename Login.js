import React from "react";
import { useState } from "react";
import "../styles/loginStyle.css";
import CreateAccount from "./CreateAccount";
import LoginForm from "./LoginForm";

/**
 * @see https://contactmentor.com/login-form-react-js-code/
 * @returns
 */

function Login() {
    /**
     * est on en mode creation de compte ou login
     */
    const [formToView, setFormToView] = useState("login");

    const goToLogin = () => {
        setFormToView("login");
    };
    const goToCreateAccount = () => {
        setFormToView("create");
    };
    // Valeur formulaire

    return (
        <div className="app">
            <div className="login-form">
                {formToView === "login" ? (
                    <LoginForm goToCreateAccount={goToCreateAccount}></LoginForm>
                ) : (
                    <CreateAccount goToLogin={goToLogin}></CreateAccount>
                )}

                {/* {isSubmitted ? <div>Connection avec succès !</div> : renderForm} */}
            </div>
        </div>
    );
}

export default Login;
