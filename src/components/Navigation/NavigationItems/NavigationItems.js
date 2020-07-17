import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import styles from './navigation-items.module.css';
const navigationItems = (props) => (
    <ul className={styles.navItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link='/orders'>Orders</NavigationItem> : null }
        {!props.isAuthenticated 
            ? <NavigationItem link='/auth'>Authenticate</NavigationItem>
            : <NavigationItem link='/logout'>Logout</NavigationItem>
        }
    </ul>
);
export default navigationItems;