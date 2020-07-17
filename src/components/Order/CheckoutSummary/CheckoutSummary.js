import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './checkout-summary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={styles.checkoutSummary}>
            <h1>We hope it tastes well !!</h1>
            <div style={{ width:'100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="success" clicked={props.checkoutContinued}>SUCCESS</Button>
        </div>
    )

}

export default checkoutSummary;