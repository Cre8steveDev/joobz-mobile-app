// Define a typed selector hook
import { RootState } from '@/providers/redux/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
