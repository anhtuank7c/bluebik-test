import { Card, Pagination, Text } from 'components';
import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import Layout from 'constants/Layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StepOne, StepTwo, StepThree } from 'components/OnBoardingForm';
import { useRouter } from 'expo-router';
import { Step, StepOneResult, StepTwoResult, useOnboardingStore } from 'stores/onboarding';

export default function OnBoardingScreen() {
  const { steps, setResult } = useOnboardingStore(state => ({
    steps: state.steps,
    setResult: state.setResult,
  }));
  const [stepIndex, setStepIndex] = useState<number>(0);
  const currentStep = useMemo(() => steps[stepIndex], [stepIndex, steps]);
  const currentStepIndex = useMemo(() => stepIndex + 1, [stepIndex]);
  const isLastStep = useMemo(() => stepIndex + 1 === steps.length, [steps, stepIndex]);

  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  const handleNextPressed = useCallback(
    (step: Step, formData: StepOneResult | StepTwoResult | string[]) => {
      setResult(step, formData);
      if (isLastStep) {
        router.replace('/welcome');
        return;
      }
      setStepIndex(prev => prev + 1);
    },
    [router, setResult, isLastStep],
  );

  const renderStep = useCallback(() => {
    const btnSubmitLabel = isLastStep ? 'Finish' : 'Next';
    switch (currentStep.step) {
      case 'StepOne':
        return <StepOne btnSubmitLabel={btnSubmitLabel} onNextPressed={handleNextPressed} />;
      case 'StepTwo':
        return <StepTwo btnSubmitLabel={btnSubmitLabel} onNextPressed={handleNextPressed} />;
      case 'StepThree':
        return <StepThree btnSubmitLabel={btnSubmitLabel} onNextPressed={handleNextPressed} />;
      default:
        throw Error('Unknown onboarding step');
    }
  }, [currentStep, isLastStep, handleNextPressed]);

  return (
    <KeyboardAwareScrollView
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="never"
      contentContainerStyle={{ flex: 1 }}
    >
      <View
        style={{
          paddingTop: top,
          paddingHorizontal: Layout.spacing.lg,
          backgroundColor: 'transparent',
          flex: 1,
        }}
      >
        <Pagination data={steps} currentStep={currentStepIndex} />
        <View
          style={{
            backgroundColor: 'transparent',
            alignItems: 'center',
            paddingVertical: Layout.spacing.xxl,
          }}
        >
          <Text
            accessible
            accessibilityLabel={currentStep.title}
            accessibilityHint={currentStep.title}
            preset="heading"
            testID="title"
          >
            {currentStep.title}
          </Text>
          <Text
            accessible
            style={{ textAlign: 'center' }}
            accessibilityLabel={currentStep.description}
            accessibilityHint={currentStep.description}
            testID="description"
          >
            {currentStep.description}
          </Text>
        </View>
      </View>
      <Card
        rounded="medium"
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          minHeight: Layout.screen.height * 0.5,
          paddingBottom: bottom,
          paddingVertical: Layout.spacing.lg,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        {renderStep()}
      </Card>
    </KeyboardAwareScrollView>
  );
}
