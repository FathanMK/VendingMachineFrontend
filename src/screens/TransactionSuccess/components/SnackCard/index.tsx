import {Box, Text} from '@gluestack-ui/themed';
import {Image} from 'react-native';
import snackImages from '../../../../utils/snackImages';
import toIDR from '../../../../utils/toIDR';

interface Props {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function SnackCard({id, name, image, price, quantity}: Props) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="$4">
      <Box height="$20" width="$20">
        <Image
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
            resizeMode: 'contain',
          }}
          source={snackImages[image]}
        />
      </Box>
      <Box flex={1} flexDirection="row" gap="$2">
        <Text fontWeight="$bold">{quantity}</Text>
        <Text>x</Text>
        <Text>{name}</Text>
      </Box>
      <Text fontSize="$lg" fontWeight="$black">
        {toIDR(price * quantity)}
      </Text>
    </Box>
  );
}
