import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

const Orders = props => {
    const {token, userId, onFetchOrders, error, orders, loading} = props;
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [token, userId, onFetchOrders]);

    let retreivedOrders = error ? <p> Unable to retrieve orders!!</p> : <Spinner/>;
    if (orders) {
        retreivedOrders =orders.map(order => {
                    return(<Order 
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}/>)
                    })
    }
    if (loading){
        retreivedOrders=<Spinner/>;
    }
    return(
        <div>
                {retreivedOrders}
        </div>
        
    );
        
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token, userId) => dispatch(actions.fetchOrders(token, userId))
    } 
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));