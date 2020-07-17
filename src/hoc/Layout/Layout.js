import React, { Component }from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import styles from './layout.module.css';
import ToolBar from '../../components/Navigation/ToolBar/ToolBar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Aux>
                <ToolBar drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}
                    isAuthenticated={this.props.isAuthenticated}/>
                <main className={styles.content}>
                    {this.props.children}
                </main>
            </Aux>

        );
    }
} 

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);