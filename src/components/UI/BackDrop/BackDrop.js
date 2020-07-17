import React from 'react';
import styles from './back-drop.module.css'
const backdrop = (props) => (
    props.show ? <div className={styles.backDrop} onClick={props.clicked}></div> : null

);

export default backdrop;