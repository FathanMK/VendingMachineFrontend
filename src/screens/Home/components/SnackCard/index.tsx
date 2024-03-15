import {Box, Button, Card, Text, ButtonText} from '@gluestack-ui/themed';
import {Image} from 'react-native';

import useSnackCard from './hooks/useSnackCard';
import snackImages from '../../../../utils/snackImages';
import toIDR from '../../../../utils/toIDR';

interface Props {
  id: string;
  image: string;
  name: string;
  stock?: number;
  price: number;
}

export default function SnackCard({id, image, name, stock, price}: Props) {
  const snack = {id, name, image, price, stock};
  const {cardWidth, foundItem, handleAdd, handleRemove} = useSnackCard(snack);
  return (
    <Card style={{width: cardWidth, height: 350}} margin="$1">
      <Image
        style={{
          flex: 1,
          height: undefined,
          width: undefined,
          marginVertical: 20,
          resizeMode: 'contain',
        }}
        source={snackImages[image]}
      />
      <Text fontWeight="$bold" fontSize="$xl">
        {name}
      </Text>
      <Text>Stock: {stock}</Text>
      <Text my="$4" textAlign="center" fontSize="$lg" fontWeight="$semibold">
        {toIDR(price)}
      </Text>
      {stock !== 0 ? (
        foundItem ? (
          <Box
            mt="$4"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Button size="xs" onPress={handleRemove}>
              <ButtonText fontWeight="$bold">-</ButtonText>
            </Button>
            <Text>{foundItem.quantity}</Text>
            <Button size="xs" onPress={handleAdd}>
              <ButtonText fontWeight="$bold">+</ButtonText>
            </Button>
          </Box>
        ) : (
          <Button mt="$4" onPress={handleAdd}>
            <ButtonText fontWeight="$bold">Add to Cart</ButtonText>
          </Button>
        )
      ) : (
        <Text fontWeight="$bold" textAlign="center" color="$red500">
          Stock Habis
        </Text>
      )}
    </Card>
  );
}
