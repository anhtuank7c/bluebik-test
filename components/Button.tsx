import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Layout from 'constants/Layout';
import Colors from 'constants/Colors';
import { Text, TextProps } from './Text';
import { ThemeProps, useThemeColor } from './Themed';

const base: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  paddingHorizontal: Layout.spacing.lg,
  height: Layout.button,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: Layout.button,
};

const presets = {
  primary: base as StyleProp<ViewStyle>,
  secondary: [base, { backgroundColor: Colors.light.tabIconDefault }] as StyleProp<ViewStyle>,
  disabled: [base, { backgroundColor: Colors.light.disabled }] as StyleProp<ViewStyle>,
};
type Presets = keyof typeof presets;
export type ButtonProps = PressableProps &
  ThemeProps & {
    title: string;
    preset?: Presets;
    titleProps?: TextProps;
  };
export function Button(props: ButtonProps) {
  const {
    title,
    preset = 'primary',
    style,
    darkColor,
    lightColor,
    titleProps,
    ...pressableProps
  } = props;
  const isDisabled = pressableProps.disabled || preset === 'disabled';
  const btnPreset = isDisabled ? 'disabled' : preset;

  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, btnPreset);
  const buttonStyle = [presets[preset], { backgroundColor }, style] as PressableProps['style'];

  const color = useThemeColor(
    { light: titleProps?.lightColor, dark: titleProps?.darkColor },
    isDisabled ? 'textBtnDisabled' : 'textBtn',
  );
  const textStyle = [{ color }] as TextStyle;
  return (
    <Pressable
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={title}
      {...pressableProps}
      style={buttonStyle}
    >
      <Text preset="primary" style={textStyle}>
        {title}
      </Text>
    </Pressable>
  );
}
