import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import styles from './auth.module.css';
import * as actions from '../../store/actions/index';
import { updatedObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls: {
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

        },
        isSignUp: true
    }

    componentDidMount () {
        if (!this.props.building && this.props.authRedirectPath === '/checkout') {
            this.props.onAuthRedirectPath('/');
        }
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls, {
            [controlName] : updatedObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(this.state.controls[controlName].value, this.state.controls[controlName].validation),
                touched: true

            })
        });

        this.setState({ controls: updatedControls});
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);

    }
    render() {
        const formElementsArray = [];

        for (let key in this.state.controls){
            formElementsArray.push(
                {
                    id:key, 
                    config: this.state.controls[key]
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
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>));

        if (this.props.loading) {
            form = <Spinner/>;
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>;
        }
        
        let redirect = null;
        if (this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.authRedirectPath}/>;
        }
        
        return (
            <div className={styles.auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="success">SUBMIT</Button>
                </form>
        <Button btnType="danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}</Button>
            </div>
        );
    }
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