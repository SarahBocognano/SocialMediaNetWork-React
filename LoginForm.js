import { useState } from "react";

/**
 * login(email, password) ⇒ Promise
 *   Login / Connexion - Cette fonction sert à connecter un utilisateur
 */
import { login } from "../lib/Social-Network-Library";

const LoginForm = (props) => {
    // Generate JSX code for error message
    const renderErrorMessage = (error) => <div className="error">{error.message}</div>;

    // const [errorMessages, setErrorMessages] = useState({});

    // const errors = {
    //     uname: "Nom d'utilisateur invalide",
    //     pass: "Mot de passe invalide",
    // };
    // // React States
    // const [isSubmitted, setIsSubmitted] = useState(false);

    /**
     * Les données saisie dans le formulaire
     */
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    /**
     * Lors d'un changement d'un input
     */
    const inputChange = function (event) {
        // le nom du champs qui a changé
        let fieldName = event.target.getAttribute("data-field-name");
        // la nouvelle valeur
        let newValue = event.target.value;

        // les valeur qui seront à enregistrer
        let newFormValues = {
            email: formValues.email,
            password: formValues.password,
        };
        // maj du champ qui a changé
        newFormValues[fieldName] = newValue;
        // save this change with "useState"
        setFormValues(newFormValues);
        // raz error from API
        setErrorFromApi("");

        // check if fields are well filled
        checkFieldsAreFilled(newFormValues);
    };
    /**
     * Liste des erreurs du formulaires
     */
    const [formErrors, setFormErrors] = useState({
        email: null, // vide : donc pas d'erreur
        password: null,
    });

    /**
     * Controle du bon remplissage de formulaire
     */
    const checkFieldsAreFilled = function (formValues) {
        formValues = {
            email: formValues.email.trim(),
            password: formValues.password.trim(),
        };

        const errors = {
            email: null, // vide : donc pas d'erreur
            password: null,
        };

        if (formValues.email.length === 0) {
            errors["email"] = { key: formValues.firstname + Date.now(), message: "Veuillez saisir votre email" };
        }
        if (formValues.password.length === 0) {
            errors["password"] = {
                key: formValues.firstname + Date.now(),
                message: "Veuillez saisir votre mot de passe",
            };
        }
        setFormErrors(errors);
    };

    /**
     * Le user veut se connecter (click ou enter)
     */
    const handleSubmit = (event) => {
        // le formulaire est donc en cours d'envoy
        setLoginPending(true);

        // envoy de la demande
        submitFormToLogin();

        // Prevent page reload (avoid event propagation)
        event.preventDefault();
        // ne pas soumettre le formulaire
        return false;
    };

    /**
     * le formulaire est il cours de transfert
     */
    const [isLoginPending, setLoginPending] = useState(false);

    /**
     * L'erreur renvoyé par l'api
     */
    const [apiLoginError, setErrorFromApi] = useState("");

    const submitFormToLogin = async () => {
        // Login / Connexion - Cette fonction sert à connecter un utilisateur
        // Valeur de retour:
        // Promise - La valeur de retour est une promesse (à récupérer avec await)
        // contenant un objet: {success: Boolean, message: String | Undefined}
        let responseFromAPI = await login(formValues.email, formValues.password);
        if (responseFromAPI.success) {
            console.log("User logged!!!");
        } else {
            setErrorFromApi(responseFromAPI.message);
        }
        // fin du traitement
        setLoginPending(false);
    };

    return (
        <div className="form">
            <div className="title">Se connecter</div>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input
                        type="text"
                        required
                        placeholder="email@example.com"
                        autoComplete="on"
                        value={formValues.email}
                        data-field-name="email"
                        onChange={inputChange}
                    />
                    {formErrors["email"] === null ? "" : renderErrorMessage(formErrors["email"])}
                </div>
                <div className="input-container">
                    <label>Mot de passe </label>
                    <input
                        type="password"
                        name="pass"
                        required
                        placeholder="Votre mot de passe"
                        autoComplete="on"
                        value={formValues.password}
                        data-field-name="password"
                        onChange={inputChange}
                    />
                    {formErrors["password"] === null ? "" : renderErrorMessage(formErrors["password"])}
                </div>

                {formErrors["email"] !== null ||
                formErrors["password"] !== null ||
                formValues.email.length === 0 ||
                formValues.password.length === 0 ? (
                    ""
                ) : (
                    <div className="form-group">
                        {isLoginPending ? (
                            <span className="loading">Connection en cours</span>
                        ) : apiLoginError !== "" ? (
                            <div className="error">{apiLoginError}</div>
                        ) : (
                            <button className="form-control btn btn-primary" onClick={handleSubmit} type="submit">
                                Se connecter
                            </button>
                        )}
                    </div>
                )}
                {/* <div className="button-container">
                    <input type="submit" />
                </div> */}
                {/* <div className="forgottenPassword">
                    <a href="#">Mot de passe Oublié ?</a>
                </div> */}
            </form>
            <div className="createNewAccount">
                <hr />
                Pas encore de compte ? &nbsp;
                <a onClick={props.goToCreateAccount} className="Create">
                    Créer nouveau compte
                </a>
            </div>
        </div>
    );
};

export default LoginForm;
