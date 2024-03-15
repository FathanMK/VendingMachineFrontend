import {
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  ScrollView,
  Text,
} from '@gluestack-ui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigation} from '../../interfaces/StackNavigation';
import LottieView from 'lottie-react-native';
import SnackCard from './components/SnackCard';
import toIDR from '../../utils/toIDR';
import {useQueryClient} from '@tanstack/react-query';
import useAppDispatch from '../../hooks/useAppDispatch';
import {clearItems} from '../../features/shoppingCart';

export default function TransactionSuccess() {
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
