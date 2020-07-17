import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import styles from './side-drawer.module.css'
import Aux from '../../hoc/Aux/Aux';
import BackDrop from '../UI/BackDrop/BackDrop';
const sideDrawer = (props) => {
    let attachedClasses = [styles.sideDrawer, styles.open];
    if (!props.open) {
        attachedClasses = [styles.sideDrawer, styles.close];
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;