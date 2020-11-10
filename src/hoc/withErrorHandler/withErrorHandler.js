import React  from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);
        const errorConfirmedHandler = () => {
            clearError();
        }
        return( 
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
       
    } 
}

export default withErrorHandler;