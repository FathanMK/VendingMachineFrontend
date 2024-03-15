import {useDispatch} from 'react-redux';
import {AppDispatch} from '../interfaces/AppDispatch';

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
