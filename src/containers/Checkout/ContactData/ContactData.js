import React, {useState} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
import styles from './contact-data.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {

    const [orderForm, setOrderForm]= useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false

        },
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
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        postalCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Postal Code'
            },
            value: '',
            validation: {
                required: true,
                maxLength: 5,
                minLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value:'fastest',displayValue: 'Fastest'},
                    {value:'cheapest',displayValue: 'Cheapest'} 
                ]
            },
            value: 'fastest',
            validation: {
            },
            valid: true,
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    

    const orderHandler = (event) => {
        event.preventDefault();
        const customerData = {};
        for (let formElementIdentifier in orderForm){
            customerData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            customer: customerData,
            userId: props.userId
        }
        props.onProcessOrder(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updatedObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true

        })
        const updatedForm = updatedObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedForm);
        setFormIsValid(formIsValid);
    }
    
    const formElementsArray = [];

    for (let key in orderForm){
        formElementsArray.push(
            {
                id:key, 
                config: orderForm[key]
            }
        )
    }
    let form = (<form onSubmit={orderHandler}>
                    {formElementsArray.map(formElement =>(
                        <Input key ={formElement.id}
                                    elementType={formElement.config.elementType} 
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}
                                    shouldValidate={formElement.config.validation}
                                    valid={formElement.config.valid}
                                    touched={formElement.config.touched}
                                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <Button btnType="success" disabled={!formIsValid}>ORDER</Button></form>);

    if (props.loading){
        form = <Spinner/>;
    }
    return (
        <div className={styles.contactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    );

  
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onProcessOrder: (order, token) => dispatch(actions.purchaseOrder(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));