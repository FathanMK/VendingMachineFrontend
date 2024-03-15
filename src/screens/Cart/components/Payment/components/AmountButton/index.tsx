import {Button, Text} from '@gluestack-ui/themed';
import toIDR from '../../../../../../utils/toIDR';

interface Props {
  onPress: () => void;
  isActive: boolean;
  number: number;
}

export default function AmountButton({onPress, isActive, number}: Props) {
  return (
    <Button flex={1} variant={isActive ? 'solid' : 'outline'} onPress={onPress}>
      <Text
        fontSize={9}
        color={isActive ? '$white' : '$black'}
        fontWeight="$bold">
        {toIDR(number)}
      </Text>
    </Button>
  );
}
