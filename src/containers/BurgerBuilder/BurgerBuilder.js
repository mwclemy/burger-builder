import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const  BurgerBuilder = props =>   {
    const [purchasing, setPurchasing] = useState(false);
    const {onInitIngredients} = props
    useEffect(() => {
       onInitIngredients();
    },[onInitIngredients]);
    
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((iKey) => {
            return ingredients[iKey];
        }).reduce((sum, el) => {
            return sum + el; 
          
        },0)

       return  sum > 0;
    }

    const purchasingHandler = () => {
        if (props.isAuthenticated){
            setPurchasing(true);
        }
        else {
           props.onSetAuthRedirectPath('/checkout');
           props.history.push('/auth');
        }
      
    }
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push('/checkout');
    }

   
    const disabledInfo = {
        ...props.ings
    }
    for (let key in disabledInfo)
        disabledInfo[key] = disabledInfo[key] <=0;

    let burger = props.error ? <p>Unable to retreive ingredients</p>:<Spinner/>;
    let orderSummary = null;
    if (props.ings) {
        burger =(<Aux><Burger ingredients={props.ings}/>
                <BuildControls 
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    isAuthenticated={props.isAuthenticated}
                    ordered={purchasingHandler}/></Aux>);

        orderSummary = <OrderSummary 
        purchaseCancelled={purchaseCancelHandler} 
        ingredients={props.ings}
        purchaseContinued={purchaseContinueHandler}
        price={props.price}/>;

    }
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
   
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));