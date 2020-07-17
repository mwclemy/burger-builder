import React from 'react';
import styles from './navigation-item.module.css';
import { NavLink } from 'react-router-dom';
const navigationItem = (props) => (
    <li className={styles.navItem}>
        <NavLink 
            to={props.link} 
            activeClassName={styles.active}
            exact={props.exact}>
            {props.children}
        </NavLink>
    </li>
);
export default navigationItem;