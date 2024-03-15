import type {Snack} from '../../interfaces/Snack';

import {
  Box,
  Fab,
  FabIcon,
  ScrollView,
  Spinner,
  Text,
} from '@gluestack-ui/themed';
import {ShoppingCart} from 'lucide-react-native';

import SnackCard from './components/SnackCard';
import useHome from './hooks/useHome';

export default function Home() {
  const {isLoading, snacks, items, accumulateItems, navigation} = useHome();

  return (
    <>
      <Box flex={1}>
        <ScrollView>
          <Box flexDirection="row" flexWrap="wrap" p="$2">
            {isLoading ? (
              <Spinner />
            ) : (
              snacks.map((item: Snack) => <SnackCard key={item.id} {...item} />)
            )}
          </Box>
        </ScrollView>
      </Box>
      <Fab size="lg" onPress={() => navigation.navigate('Cart')}>
        {items.length !== 0 && (
          <Box
            h="$6"
            w="$6"
            rounded="$full"
            bgColor="$red500"
            alignItems="center"
            justifyContent="center"
            position="absolute"
            top={-10}
            right={0}>
            <Text color="$white">
              {accumulateItems() >= 9 ? '9+' : accumulateItems()}
            </Text>
          </Box>
        )}
        <FabIcon as={ShoppingCart} />
      </Fab>
    </>
  );
}
