import { View } from 'react-native';
import { useCallback, useMemo, useState } from 'react';
import Layout from 'constants/Layout';
import { Step } from 'stores/onboarding';
import { ListItem } from '../ListItem';
import { Button } from '../Button';

type StepThreeProps = {
  btnSubmitLabel: string;
  onNextPressed: (step: Step, formData: string[]) => void;
};
const options = ['Money transfer', 'Payment', 'Bill payment', 'Loan', 'Investment', 'Saving'];
export function StepThree(props: StepThreeProps) {
  const { onNextPressed, btnSubmitLabel } = props;
  const [selected, setSelected] = useState<string[]>([]);

  const isFormValid = useMemo(() => selected.length > 0, [selected]);

  const renderListItem = useCallback(
    (option: string, index: number) => {
      const isSelected = selected.includes(option);
      const handleListItemPressed = (newValue: boolean) => {
        setSelected(prev => {
          const mSelected = prev.slice();
          if (!newValue) {
            return mSelected.filter(op => op !== option);
          }
          mSelected.push(option);
          return mSelected;
        });
      };

      return (
        <ListItem
          testID={`listitem-${index}`}
          key={option}
          title={option}
          value={isSelected}
          onChangeValue={handleListItemPressed}
        />
      );
    },
    [selected],
  );

  return (
    <>
      <View style={{ flex: 1 }}>{options.map(renderListItem)}</View>
      <Button
        testID="btnFinish"
        disabled={!isFormValid}
        onPress={() => onNextPressed('StepThree', selected)}
        preset="primary"
        title={btnSubmitLabel}
        style={{ margin: Layout.spacing.lg }}
      />
    </>
  );
}
