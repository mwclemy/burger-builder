import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((iKey) => {
        return (
            <li key={iKey}>
                <span style={{textTransform: 'capitalize'}}>{iKey}</span>:{props.ingredients[iKey]}
            </li>)
    })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price:{props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType='danger'>CANCEL</Button>
            <Button clicked={props.purchaseContinued} btnType='success'>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;