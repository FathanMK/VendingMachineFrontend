import {
  Box,
  Button,
  Card,
  CloseIcon,
  Icon,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import {Image} from 'react-native';
import snackImages from '../../../../utils/snackImages';
import toIDR from '../../../../utils/toIDR';
import useSnackCard from './hooks/useSnackCard';

interface Props {
  id: string;
  image: string;
  name: string;
  stock: number;
  price: number;
  quantity: number;
}

export default function SnackCard({
  id,
  image,
  name,
  stock,
  quantity,
  price,
}: Props) {
  const snack = {
    id,
    name,
    stock,
    image,
    price,
  };

  const {handleAdd, handleRemove, handleRemoveById} = useSnackCard(snack);

  return (
    <Card p="$4">
      <Pressable onPress={handleRemoveById}>
        <Icon alignSelf="flex-end" as={CloseIcon} />
      </Pressable>
      <Box flexDirection="row" alignItems="center" gap="$4">
        <Box height="$24" width="$24">
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
        <Box flex={1}>
          <Text fontWeight="$semibold" fontSize="$xl">
            {name}
          </Text>
          <Box
            mt="$4"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Button size="xs" onPress={handleRemove}>
              <Text fontWeight="$bold" color="$white">
                -
              </Text>
            </Button>
            <Text fontWeight="$bold">{quantity}</Text>
            <Button size="xs" onPress={handleAdd}>
              <Text fontWeight="$bold" color="$white">
                +
              </Text>
            </Button>
          </Box>
        </Box>
        <Box>
          <Text fontSize="$lg" fontWeight="$black">
            {toIDR(quantity * price)}
          </Text>
        </Box>
      </Box>
    </Card>
  );
}
