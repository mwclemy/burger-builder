import React from 'react';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import styles from './burger.module.css';
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map((ingredientKey)=>{
        return [...Array(props.ingredients[ingredientKey])].map((_,i)=>{
            return <BurgerIngredients key={ingredientKey+i}type={ingredientKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please start adding ingredients.</p>; 
    }
    return (
        <div className={styles.burger}>
            <BurgerIngredients type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
       
    );
}

export default burger;