import React, {Component} from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
       this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = this.props.error ? <p> Unable to retrieve orders!!</p> : <Spinner/>;
        if (this.props.orders) {
            orders =this.props.orders.map(order => {
                        return(<Order 
                                    key={order.id}
                                    ingredients={order.ingredients}
                                    price={order.price}/>)
                     })
        }
        if (this.props.loading){
            orders=<Spinner/>;
        }
        return(
            <div>
                 {orders}
            </div>
          
        );
       
    }
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