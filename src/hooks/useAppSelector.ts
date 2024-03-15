import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../interfaces/RootState';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
