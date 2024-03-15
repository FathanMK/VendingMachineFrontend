import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from '@gluestack-ui/themed';
import useAppSelector from '../../../../../hooks/useAppSelector';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../../../../interfaces/StackNavigation';
import {useState} from 'react';
import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../../../../../utils/axiosInstance';

export default function usePayment(setShowAlert: any) {
  const {items, total} = useAppSelector(state => state.shoppingCart);
  const {snacks} = useAppSelector(state => state.snacks);
  const navigation = useNavigation<StackNavigation>();
  const toast = useToast();
  const [payAmount, setPayAmount] = useState<number>(0);
  const change = payAmount - total;

  const payments = [2000, 5000, 10000, 20000, 50000, 100000];

  const snackMutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.put(`/snacks/${data.id}`, data);
    },
    onSuccess() {
      setShowAlert(false);
      navigation.navigate('TransactionSuccess', {
        items,
        total,
        change,
      });
    },
  });

  const updatedSnacks = snacks
    .map(snack => {
      const cartItem = items.find((item: any) => item.id === snack.id);
      if (cartItem) {
        const updatedStock = snack.stock! - cartItem.quantity;
        if (updatedStock !== snack.stock) {
          return {...snack, stock: updatedStock};
        }
      }
      return null;
    })
    .filter(Boolean);

  const handlePayment = () => {
    if (payAmount === 0) {
      toast.show({
        duration: 3000,
        placement: 'top',
        render: ({}) => {
          return (
            <Toast bg="$red500">
              <VStack space="xs">
                <ToastTitle color="$textLight50">
                  Silahkan pilih pembayaran
                </ToastTitle>
                <ToastDescription color="$textLight50">
                  Pembayaran belum dipilih!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
      return;
    }
    updatedSnacks.forEach(snack => snackMutation.mutate(snack));
  };

  const handlePayAmount = (number: number) => {
    setPayAmount(number);
  };

  return {payments, payAmount, handlePayAmount, total, change, handlePayment};
}
