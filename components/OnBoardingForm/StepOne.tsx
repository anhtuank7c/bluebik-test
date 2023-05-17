import Layout from 'constants/Layout';
import { Alert, View } from 'react-native';
import { Button } from 'components/Button';
import { useCallback, useMemo, useState } from 'react';
import { Step, StepOneResult } from 'stores/onboarding';
import { TextInput } from '../TextInput';

type StepOneProps = {
  btnSubmitLabel: string;
  onNextPressed: (step: Step, formData: StepOneResult) => void;
};

export function StepOne(props: StepOneProps) {
  const { onNextPressed, btnSubmitLabel } = props;
  const [fullName, setFullName] = useState('');
  const [idNumber, setIDNumber] = useState('');

  const handleNextPressed = useCallback(() => {
    if (typeof onNextPressed === 'function') {
      onNextPressed('StepOne', { fullName, idNumber });
    }
  }, [onNextPressed, fullName, idNumber]);

  const isFormValid = useMemo(() => {
    return fullName.trim().length > 3 && idNumber.trim().length === 12;
  }, [fullName, idNumber]);

  const idMask = useMemo(
    () => [
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
      ' ',
      /\d/,
    ],
    [],
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          testID="fullName"
          accessible
          accessibilityLabel="full name"
          accessibilityHint="enter your full name"
          label="Full name"
          value={fullName}
          onChangeText={(_, text) => setFullName(text)}
        />
        <TextInput
          testID="idNumber"
          accessible
          accessibilityLabel="ID number"
          accessibilityHint="enter your identify number"
          label="ID number"
          rightIcon="scan-sharp"
          onRightIconPress={() =>
            Alert.alert('Feature under construction', 'Please come back later.')
          }
          containerStyle={{ marginTop: Layout.spacing.lg }}
          keyboardType="numeric"
          returnKeyType="next"
          value={idNumber}
          onChangeText={(_, text) => setIDNumber(text)}
          mask={idMask}
        />
      </View>
      <Button
        testID="btnNext"
        disabled={!isFormValid}
        onPress={handleNextPressed}
        preset="primary"
        title={btnSubmitLabel}
        style={{ margin: Layout.spacing.lg }}
      />
    </>
  );
}
