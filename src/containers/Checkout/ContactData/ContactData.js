import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input';
import styles from './contact-data.module.css';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm:{
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
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const customerData = {};
        for (let formElementIdentifier in this.state.orderForm){
            customerData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: customerData,
            userId: this.props.userId
        }
        this.props.onProcessOrder(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {

        const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true

        })
        const updatedForm = updatedObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});

    }
    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm){
            formElementsArray.push(
                {
                    id:key, 
                    config: this.state.orderForm[key]
                }
            )
        }
        let form = (<form onSubmit={this.orderHandler}>
                        {formElementsArray.map(formElement =>(
                            <Input key ={formElement.id}
                                        elementType={formElement.config.elementType} 
                                        elementConfig={formElement.config.elementConfig}
                                        value={formElement.config.value}
                                        shouldValidate={formElement.config.validation}
                                        valid={formElement.config.valid}
                                        touched={formElement.config.touched}
                                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                        ))}
                        <Button btnType="success" disabled={!this.state.formIsValid}>ORDER</Button></form>);

        if (this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={styles.contactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );

    }
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