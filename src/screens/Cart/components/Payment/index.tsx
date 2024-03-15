import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
  Button,
  Box,
  ButtonGroup,
  ButtonText,
  CloseIcon,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@gluestack-ui/themed';
import {Dispatch, SetStateAction, useState} from 'react';
import useAppSelector from '../../../../hooks/useAppSelector';
import toIDR from '../../../../utils/toIDR';
import {useMutation} from '@tanstack/react-query';
import axiosInstance from '../../../../utils/axiosInstance';
import {useNavigation} from '@react-navigation/native';
import {StackNavigation} from '../../../../interfaces/StackNavigation';
import AmountButton from './components/AmountButton';

interface Props {
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

export default function Payment({showAlert, setShowAlert}: Props) {
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

  return (
    <AlertDialog isOpen={showAlert} onClose={() => setShowAlert(false)}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading>Pembayaran</Heading>
          <AlertDialogCloseButton>
            <Icon as={CloseIcon} />
          </AlertDialogCloseButton>
        </AlertDialogHeader>
        <AlertDialogBody>
          <Text mb="$8" textAlign="center">
            Silahkan pilih uang yg akan diterima oleh Vending Machine
          </Text>
          <VStack gap="$6">
            <HStack gap="$2">
              {payments.slice(0, 3).map(item => (
                <AmountButton
                  key={item}
                  number={item}
                  isActive={payAmount === item}
                  onPress={() => handlePayAmount(item)}
                />
              ))}
            </HStack>
            <HStack gap="$2">
              {payments.slice(3, 6).map(item => (
                <AmountButton
                  key={item}
                  number={item}
                  isActive={payAmount === item}
                  onPress={() => handlePayAmount(item)}
                />
              ))}
            </HStack>
          </VStack>
          <Box mt="$8" gap="$2" alignItems="center" justifyContent="center">
            <Box w="$full" flexDirection="row" justifyContent="space-between">
              <Text>Total yang harus dibayar: </Text>
              <Text fontWeight="$black">{toIDR(total)}</Text>
            </Box>
            <Box w="$full" flexDirection="row" justifyContent="space-between">
              <Text>Kembalian: </Text>
              <Text fontWeight="$black">
                {payAmount === 0 ? '-' : toIDR(change)}
              </Text>
            </Box>
          </Box>
        </AlertDialogBody>
        <AlertDialogFooter alignItems="center" justifyContent="center">
          <ButtonGroup my="$4">
            <Button
              bgColor="$red500"
              $active-bgColor="$red600"
              onPress={() => setShowAlert(false)}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              isDisabled={payAmount === 0 || change < 0}
              bgColor="$green500"
              $active-bgColor="$green600"
              onPress={handlePayment}>
              <ButtonText>Bayar</ButtonText>
            </Button>
          </ButtonGroup>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
