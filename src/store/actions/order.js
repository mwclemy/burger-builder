import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START
    }
}
export const purchaseOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        orderId: id,
        orderData: orderData
    }

}

export const purchaseOrderFail = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAIL,
        error: error
    }

}

export const purchaseOrder = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseOrderStart());
        axios.post('/orders.json?auth='+ token, orderData).then(response => {
            dispatch(purchaseOrderSuccess(response.data.name, orderData));
        }).catch(error => {
            dispatch(purchaseOrderFail(error));
        });

    }
    
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        const query = '?auth='+ token + '&orderBy="userId"&equalTo="'+userId+'"';
        dispatch(fetchOrdersStart());
        axios.get('/orders.json'+query)
        .then(response=> {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key],
                    id: key
                })

            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrdersFail(error));
        })

    }
}


