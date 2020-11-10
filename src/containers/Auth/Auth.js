import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './auth.module.css';
import * as actions from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false

        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false

        }

    });
    const [isSignUp, setIsSignUp] = useState(true);
   
    const {building, authRedirectPath, onAuthRedirectPath} = props;

    useEffect(() => {
        if (!building && authRedirectPath === '/checkout') {
            onAuthRedirectPath('/');
        }
    },[building, authRedirectPath, onAuthRedirectPath]);

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(authForm, {
            [controlName] : updatedObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(authForm[controlName].value, authForm[controlName].validation),
                touched: true

            })
        });

       setAuthForm(updatedControls);
    }

    const switchAuthModeHandler = () => {
       setIsSignUp(!isSignUp);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp);

    }
    
    const formElementsArray = [];

    for (let key in authForm){
        formElementsArray.push(
            {
                id:key, 
                config: authForm[key]
            }
        )
    }
    let form = formElementsArray
                .map(formElement =>(
                    <Input key ={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        shouldValidate={formElement.config.validation}
                        valid={formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)}/>));

    if (props.loading) {
        form = <Spinner/>;
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }
    
    let redirect = null;
    if (props.isAuthenticated) {
        redirect = <Redirect to={authRedirectPath}/>;
    }
    
    return (
        <div className={styles.auth}>
            {redirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="success">SUBMIT</Button>
            </form>
    <Button btnType="danger" clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
        </div>
    );
   
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);