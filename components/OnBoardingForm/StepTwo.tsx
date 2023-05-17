import Layout from 'constants/Layout';
import { Alert, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { useCallback, useMemo, useState } from 'react';
import { Button } from 'components/Button';
import { Step } from 'app/(onboarding)/data';
import { StepTwoResult } from 'stores/onboarding';
import { TextInput } from '../TextInput';

type StepTwoProps = {
  onNextPressed: (step: Step, formData: StepTwoResult) => void;
};

export function StepTwo(props: StepTwoProps) {
  const { onNextPressed } = props;
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleNextPressed = useCallback(() => {
    if (typeof onNextPressed === 'function') {
      onNextPressed('StepTwo', { email, phoneNumber, dateOfBirth });
    }
  }, [onNextPressed, email, phoneNumber, dateOfBirth]);

  const isFormValid = useMemo(() => {
    // I just implement a very simple validation rule.
    // Todo: Implement more complex rules
    return (
      email.trim().length > 0 && phoneNumber.trim().length > 0 && dateOfBirth.trim().length > 0
    );
  }, [email, phoneNumber, dateOfBirth]);

  return (
    <>
      <View style={{ flex: 1 }}>
        <TextInput
          accessible
          accessibilityLabel="Email"
          accessibilityHint="enter your email"
          label="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={(_, text) => setEmail(text)}
        />
        <TextInput
          accessible
          accessibilityLabel="Phone number"
          accessibilityHint="enter your phone number"
          label="Phone number"
          containerStyle={{ marginTop: Layout.spacing.lg }}
          keyboardType="phone-pad"
          returnKeyType="next"
          autoCapitalize="none"
          value={phoneNumber}
          onChangeText={(_, text) => setPhoneNumber(text)}
        />
        <TextInput
          accessible
          accessibilityLabel="Date of birth"
          accessibilityHint="enter your birth of date"
          label="Date of birth"
          rightIcon="calendar"
          onRightIconPress={() =>
            Alert.alert('Feature under construction', 'Please come back later.')
          }
          containerStyle={{ marginTop: Layout.spacing.lg }}
          keyboardType="number-pad"
          returnKeyType="done"
          mask={Masks.DATE_DDMMYYYY}
          value={dateOfBirth}
          onChangeText={(_, text) => setDateOfBirth(text)}
        />
      </View>
      <Button
        disabled={!isFormValid}
        onPress={handleNextPressed}
        preset="primary"
        title="Next"
        style={{ margin: Layout.spacing.lg }}
      />
    </>
  );
}
