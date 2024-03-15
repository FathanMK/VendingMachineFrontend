import {useNavigation, useRoute} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';

import {StackNavigation} from '../../../interfaces/StackNavigation';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {clearItems} from '../../../features/shoppingCart';

export default function useTransactionSuccess() {
  const navigation = useNavigation<StackNavigation>();
  const route = useRoute<any>();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const {change, items, total} = route?.params;

  const handleHome = () => {
    dispatch(clearItems());
    queryClient.invalidateQueries({queryKey: ['snacks']});
    navigation.navigate('Home');
  };

  return {items, total, change, handleHome};
}
