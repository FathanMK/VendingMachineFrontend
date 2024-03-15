import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';

import SnackCard from './components/SnackCard';
import toIDR from '../../utils/toIDR';
import useTransactionSuccess from './hooks/useTransactionSuccess';

export default function TransactionSuccess() {
  const {items, total, change, handleHome} = useTransactionSuccess();
  return (
    <Box flex={1} alignItems="center" p="$4">
      <LottieView
        style={{width: '25%', height: '25%', marginBottom: -30}}
        autoPlay
        loop={false}
        source={require('../../images/anim/success.json')}
      />
      <Heading mb="$10">Transaksi Berhasil</Heading>
      <Card w="$full">
        <Heading mb="$4">Barang</Heading>
        <ScrollView maxHeight="$64">
          {items.map((item: any) => (
            <SnackCard key={item.id} {...item} />
          ))}
        </ScrollView>
        <Box
          flexDirection="column"
          borderTopColor="$textDark200"
          borderTopWidth="$1"
          gap="$2"
          py="$8">
          <Box flexDirection="row" justifyContent="space-between">
            <Text>Total:</Text>
            <Text fontWeight="$black">{toIDR(total)}</Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-between">
            <Text>Kembalian:</Text>
            <Text fontWeight="$black">{toIDR(change)}</Text>
          </Box>
        </Box>
        <Button onPress={handleHome}>
          <ButtonText>Kembali ke Home</ButtonText>
        </Button>
      </Card>
    </Box>
  );
}
