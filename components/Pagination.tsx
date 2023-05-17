import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import Colors from 'constants/Colors';
import { View } from './View';
import { Text } from './Text';

type Item = object | number | string | boolean;
export type PaginationProps = {
  currentStep: number;
  data: Array<Item>;
};
export function Pagination(props: PaginationProps) {
  const { data, currentStep } = props;
  if (currentStep < 0) {
    throw Error('Invalid step index');
  }
  if (data.length > 5) {
    throw Error('Data length exceeded. Maximum 5 steps.');
  }
  const renderStep = useCallback(
    (_: Item, index: number) => {
      const isActivated = index + 1 === currentStep;
      const lightColor = isActivated ? Colors.light.tint : Colors.light.disabled;
      const darkColor = isActivated ? Colors.dark.tint : Colors.dark.disabled;
      return (
        <View
          key={`item-${index}`}
          style={{ height: 5, width: 30, borderRadius: 5 }}
          lightColor={lightColor}
          darkColor={darkColor}
        />
      );
    },
    [currentStep],
  );

  return (
    <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ columnGap: 10 }}
        style={{ paddingVertical: 10 }}
      >
        {data.map(renderStep)}
      </ScrollView>
      <Text lightColor={Colors.light.textDisabled} darkColor={Colors.dark.textDisabled}>
        Step {currentStep}/{data.length}
      </Text>
    </View>
  );
}
