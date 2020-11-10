import React, { useState }from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import styles from './layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
       setSideDrawerIsVisible(false);
    }

    const sideDrawerToggleHandler = () => {
       setSideDrawerIsVisible(!sideDrawerIsVisible);
    }

    return (
        <Aux>
            <ToolBar drawerToggleClicked={sideDrawerToggleHandler}
                isAuthenticated={props.isAuthenticated}/>
            <SideDrawer 
                open={sideDrawerIsVisible} 
                closed={sideDrawerClosedHandler}
                isAuthenticated={props.isAuthenticated}/>
            <main className={styles.content}>
                {props.children}
            </main>
        </Aux>

    );
   
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);