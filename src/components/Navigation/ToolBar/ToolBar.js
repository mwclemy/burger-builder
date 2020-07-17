import React from 'react';
import styles from './tool-bar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../../SideDrawer/DrawerToggle/DrawerToggle';
const toobar = (props) => (
    <header className={styles.toolBar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={styles.logo}>
            <Logo/>
        </div>
        <nav className={styles.deskTopOnly}>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
    </header>
);

export default toobar;