import { shallow } from 'zustand/shallow';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, View, useThemeColor } from 'components';
import Layout from 'constants/Layout';
import { useRouter } from 'expo-router';
import { useOnboardingStore } from 'stores/onboarding';

export default function WelcomeScreen() {
  const color = useThemeColor({}, 'primary');
  const [result, shuffleSteps] = useOnboardingStore(
    state => [state.result, state.shuffleSteps],
    shallow,
  );
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Layout.spacing.lg,
      }}
    >
      <Ionicons name="medal-outline" size={88} color={color} />
      <Text preset="heading" style={{ paddingBottom: Layout.spacing.lg }}>
        Congratulation
      </Text>
      <Text preset="secondary" style={{ paddingBottom: Layout.spacing.lg }}>
        You has been passed all the onboarding steps.
      </Text>
      <Button
        title="Shuffle onboarding steps"
        onPress={() => {
          shuffleSteps();
          router.replace('/(onboarding)');
        }}
      />
      <Text
        style={{
          paddingTop: Layout.spacing.lg,
          fontSize: 15,
          fontStyle: 'italic',
          fontWeight: '400',
        }}
      >
        {JSON.stringify(Array.from(result.entries()))}
      </Text>
    </View>
  );
}
