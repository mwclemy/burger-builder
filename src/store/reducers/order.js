import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const intialState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
}

const purchaseInit = (state, action) => {
    return updatedObject(state, { purchased: false });
}

const purchaseOrderStart = (state, action) => {
    return updatedObject(state, { loading: true });

}

const purchaseOrderSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updatedObject(state, {orders: state.orders.concat(newOrder), loading: false, purchased: true });
        
}

const purchaseOrderFail = (state, action) => {
    return updatedObject(state, { loading: false });
}

const fetchOrdersStart = (state, action) => {
    return updatedObject(state, { loading: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updatedObject(state, {orders: action.orders,loading: false});
}

const fetchOrdersFail = (state, action) => {
    return updatedObject(state, {loading: false, error: action.error});
}
const order = (state = intialState, action) => {

    switch(action.type){
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_ORDER_START: return purchaseOrderStart(state, action);
        case actionTypes.PURCHASE_ORDER_SUCCESS: return purchaseOrderSuccess(state, action);
        case actionTypes.PURCHASE_ORDER_FAIL: return purchaseOrderFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default: return state;
    }

}

export default order;