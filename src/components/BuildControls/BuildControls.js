import React from 'react'
import styles from './build-controls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"}
];
const buildControls = (props) => {
    return (
        <div className={styles.buildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    added={() => props.ingredientAdded(ctrl.type)} 
                    removed={() => props.ingredientRemoved(ctrl.type)} 
                    label={ctrl.label} 
                    key={ctrl.label}
                    disabled={props.disabled[ctrl.type]}/>
            ))}
            <button onClick={props.ordered} disabled={!props.purchasable} className={styles.orderButton}>
                {props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    );
}
export default buildControls;