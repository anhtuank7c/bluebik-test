import { Card, Pagination, Text } from 'components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  const stepIndexRef = useRef(stepIndex);
  const currentStep = useMemo(() => steps[stepIndex], [stepIndex, steps]);
  const currentStepIndex = useMemo(() => stepIndex + 1, [stepIndex]);

  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);

  const handleNextPressed = useCallback(
    (step: Step, formData: StepOneResult | StepTwoResult | string[]) => {
      setResult(step, formData);
      if (stepIndexRef.current + 1 === steps.length) {
        router.replace('/welcome');
        return;
      }
      setStepIndex(prev => prev + 1);
    },
    [router, setResult, steps.length],
  );

  const renderStep = useCallback(() => {
    switch (currentStep.step) {
      case 'StepOne':
        return <StepOne onNextPressed={handleNextPressed} />;
      case 'StepTwo':
        return <StepTwo onNextPressed={handleNextPressed} />;
      case 'StepThree':
        return <StepThree onNextPressed={handleNextPressed} />;
      default:
        throw Error('Unknown onboarding step');
    }
  }, [currentStep, handleNextPressed]);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: top, flex: 1 }}>
      <View
        style={{ paddingHorizontal: Layout.spacing.lg, backgroundColor: 'transparent', flex: 1 }}
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
          >
            {currentStep.title}
          </Text>
          <Text
            accessible
            style={{ textAlign: 'center' }}
            accessibilityLabel={currentStep.description}
            accessibilityHint={currentStep.description}
          >
            {currentStep.description}
          </Text>
        </View>
      </View>
      <Card
        rounded="medium"
        style={{
          minHeight: Layout.screen.height * 0.62,
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
