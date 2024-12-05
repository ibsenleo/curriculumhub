import { logout as logoutAuth } from '../../auth';
import { clearStateAction } from '../actions/clearStateAction';

export const logoutAndReset = () => (dispatch) => {
    dispatch(logoutAuth());
    dispatch(clearStateAction());
};