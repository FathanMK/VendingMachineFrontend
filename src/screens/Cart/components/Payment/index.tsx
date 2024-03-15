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
} from '@gluestack-ui/themed';
import {Dispatch, SetStateAction} from 'react';
import toIDR from '../../../../utils/toIDR';
import AmountButton from './components/AmountButton';
import usePayment from './hooks/usePayment';

interface Props {
  showAlert: boolean;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
}

export default function Payment({showAlert, setShowAlert}: Props) {
  const {payments, payAmount, handlePayAmount, total, change, handlePayment} =
    usePayment(setShowAlert);

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
