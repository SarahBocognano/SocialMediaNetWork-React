import React from "react";
import { register } from "../lib/Social-Network-Library";
import { useState } from "react";

export const CreateAccount = (props) => {
    // firstname 	String 	Prénom
    // lastname 	String 	Nom
    // email 	    String 	Adresse email
    // password 	String 	Mot de passe

    /**
     * TESTS pour avoir un formulaire déjà rempli
     */
    let defaultFirstNameToTest = "Pierre";
    let defaultLastNameToTest = "de la Loose";
    let defaultEmailNameToTest = "aze@rty.com";
    let defaultPassNameToTest = "1234";

    /**
     * Les données saisie dans le formulaire
     */
    const [formValues, setFormValues] = useState({
        firstname: defaultFirstNameToTest,
        lastname: defaultLastNameToTest,
        email: defaultEmailNameToTest,
        password: defaultPassNameToTest,
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
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            password: formValues.password,
        };
        // maj du champ qui a changé
        newFormValues[fieldName] = newValue;
        // save this change with "useState"
        setFormValues(newFormValues);
        // check if fields are well filled
        checkFieldsAreFilled(newFormValues);
    };

    /**
     * Liste des erreurs du formulaires
     */
    const [formErrors, setFormErrors] = useState([]);
    /**
     * Controle du bon remplissage de formulaire
     */
    const checkFieldsAreFilled = function (formValues) {
        formValues = {
            firstname: formValues.firstname.trim(),
            lastname: formValues.lastname.trim(),
            email: formValues.email.trim(),
            password: formValues.password.trim(),
        };

        const errors = [];

        if (formValues.firstname.length === 0) {
            errors.push({ key: formValues.firstname + Date.now(), text: "Veuillez saisir votre prénom" });
        }

        if (formValues.lastname.length === 0) {
            errors.push({ key: formValues.lastname + Date.now(), text: "Veuillez saisir votre nom" });
        }

        if (formValues.email.length === 0) {
            errors.push({ key: formValues.email + Date.now(), text: "Veuillez saisir votre email" });
        } else {
            // verifie uniquement la présence de "@"
            // TODO : corriger avec une vrai comparaison
            if (formValues.email.indexOf("@") === -1) {
                errors.push({ key: formValues.email + Date.now(), text: "L'addresse mail n'est pas valide" });
            }
        }

        if (formValues.password.length === 0) {
            errors.push({ key: formValues.password + Date.now(), text: "Veillez saisir votre mot de passe" });
        } else {
            if (formValues.password.length < 6) {
                errors.push({
                    key: formValues.password + Date.now(),
                    text: "Votre mot de passe est trop court (min 6char)",
                });
            }
        }
        setFormErrors([...errors]);
    };

    /**
     * demande de creation de compte
     */
    const submitForm = function () {
        submitFormToCreateAccount();
        return false;
    };

    // todo : send to api : formValues
    // Dayle : it's for you ;)
    const submitFormToCreateAccount = async function () {
        // Register / Inscription - Cette fonction sert à créer un compte utilisateur
        // Valeur de retour: Promise - La valeur de retour est une promesse (à récupérer avec await) contenant un objet: {success: Boolean, message: String | Undefined}.
        // Param 	Type 	Description
        // firstname 	String 	Prénom
        // lastname 	String 	Nom
        // email 	String 	Adresse email
        // password 	String 	Mot de passe
        let responseFromAPI = await register(
            formValues.firstname,
            formValues.lastname,
            formValues.email,
            formValues.password
        );
        // {success: Boolean, message: String | Undefined}
        if (responseFromAPI.success) {
            console.log("User registered!!!");
        } else {
            console.error(responseFromAPI.message);
        }
    };

    return (
        <form>
            <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                    className="form-control"
                    id="name"
                    value={formValues.lastname}
                    data-field-name="lastname"
                    onChange={inputChange}
                    placeholder="please fill your name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="name">Prenom</label>
                <input
                    className="form-control"
                    id="prenom"
                    value={formValues.firstname}
                    data-field-name="firstname"
                    onChange={inputChange}
                    placeholder="please fill your first name"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formValues.email}
                    data-field-name="email"
                    onChange={inputChange}
                    placeholder="email@example.com"
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Mot de passe</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formValues.password}
                    data-field-name="password"
                    onChange={inputChange}
                    placeholder="your secure password"
                />
            </div>
            {formErrors.length === 0 ? (
                <div className="form-group">
                    <a className="form-control btn btn-primary" onClick={submitForm} type="submit">
                        Créer compte
                    </a>
                </div>
            ) : (
                <ul>
                    {formErrors.map((error) => (
                        <li key={error.key}>{error.text}</li>
                    ))}
                </ul>
            )}

            <div className="form-group">
                <hr />
                You have already an account ? &nbsp;
                <a onClick={props.goToLogin} className="form-control btn btn-primary" type="submit">
                    go to login
                </a>
            </div>
        </form>
    );
};
export default CreateAccount;
