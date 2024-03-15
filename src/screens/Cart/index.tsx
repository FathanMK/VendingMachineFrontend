import {Box, Button, Card, ScrollView, Text} from '@gluestack-ui/themed';
import {useState} from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import SnackCard from './components/SnackCard';
import Payment from './components/Payment';
import toIDR from '../../utils/toIDR';

export default function Cart() {
  const [showAlert, setShowAlert] = useState(false);
  const {items, total} = useAppSelector(state => state.shoppingCart);

  if (items.length === 0)
    return (
      <Box flex={1} alignItems="center" justifyContent="center">
        <Text>kosong</Text>
      </Box>
    );
  return (
    <>
      <ScrollView>
        <Box p="$2" gap="$4">
          {items.map((item: any) => (
            <SnackCard key={item.id} {...item} />
          ))}
          <Card my="$4">
            <Box flexDirection="row" justifyContent="space-between">
              <Text fontSize="$lg">Total: </Text>
              <Text fontSize="$lg" fontWeight="$black">
                {toIDR(total)}
              </Text>
            </Box>
          </Card>
          <Button
            size="lg"
            bgColor="$green500"
            $active-bgColor="$green600"
            onPress={() => setShowAlert(true)}>
            <Text fontSize="$lg" color="$white">
              Bayar
            </Text>
          </Button>
        </Box>
      </ScrollView>
      <Payment showAlert={showAlert} setShowAlert={setShowAlert} />
    </>
  );
}
