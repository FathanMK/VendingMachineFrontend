import type {Snack} from '../../../../../interfaces/Snack';

import {useWindowDimensions} from 'react-native';
import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';

import useAppDispatch from '../../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../../hooks/useAppSelector';
import {add, remove} from '../../../../../features/shoppingCart';

export default function useSnackCard(snack: Snack) {
  const {id, name, price, stock} = snack;
  const dispatch = useAppDispatch();
  const {items, total} = useAppSelector(state => state.shoppingCart);
  const {width} = useWindowDimensions();
  const toast = useToast();
  const cardWidth = width / 2 - 16;
  const foundItem = items.find(item => item.id === id);

  const handleAdd = () => {
    if (foundItem?.quantity! >= stock!) {
      toast.show({
        duration: 3000,
        placement: 'top',
        render: ({}) => {
          return (
            <Toast bg="$yellow500">
              <VStack space="xs">
                <ToastTitle color="$textLight50">Stock Tidak Cukup</ToastTitle>
                <ToastDescription color="$textLight50">
                  Stock {name} habis!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      return;
    }
    dispatch(add({...snack, quantity: 1}));
    if (total + price > 100000) {
      toast.show({
        duration: 3000,
        placement: 'top',
        render: ({}) => {
          return (
            <Toast bg="$yellow500">
              <VStack space="xs">
                <ToastTitle color="$textLight50">
                  Maksimum Total Tercapai
                </ToastTitle>
                <ToastDescription color="$textLight50">
                  Maksimum total harus dibawah Rp. 100.000
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  const handleRemove = () => {
    dispatch(remove({...snack, quantity: 1}));
  };

  return {cardWidth, foundItem, handleAdd, handleRemove};
}
