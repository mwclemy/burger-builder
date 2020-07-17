import React from 'react';
import styles from './input.module.css';
const input= (props) => {
    let inputElement = null;
    let inpuntClasses = [styles.inputElement];
    if (!props.valid && props.shouldValidate && props.touched) {
        inpuntClasses.push(styles.invalid);
       
    }
    switch(props.elementType) {

        case('input'):
            inputElement=<input 
                className={inpuntClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
        break;
        case('textarea'):
            inputElement=<textarea 
                className={inpuntClasses.join(' ')}  
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
        break;
        case('select'):
            inputElement=(<select 
                    className={inpuntClasses.join(' ')}  
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>(
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
        break;
        default:
            inputElement=<input 
                className={inpuntClasses.join(' ')}  
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>;
        break;

    }
    return (
        <div className={styles.input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );

}

export default input;