import type {Snack} from '../../../../../interfaces/Snack';

import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';

import useAppDispatch from '../../../../../hooks/useAppDispatch';
import useAppSelector from '../../../../../hooks/useAppSelector';
import {add, remove, removeById} from '../../../../../features/shoppingCart';

export default function useSnackCard(snack: Snack) {
  const {id, price, stock, name} = snack;
  const {items, total} = useAppSelector(state => state.shoppingCart);
  const dispatch = useAppDispatch();
  const foundItem = items.find(item => item.id === id);
  const toast = useToast();

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

  const handleRemoveById = () => {
    dispatch(removeById(snack.id));
  };

  return {handleAdd, handleRemove, handleRemoveById};
}
