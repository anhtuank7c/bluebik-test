import { Text as DefaultText, TextStyle } from 'react-native';
import { useThemeColor, ThemeProps } from './Themed';

const presets = {
  primary: {
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: 0.3,
    lineHeight: 20,
  } as TextStyle,
  secondary: {
    fontSize: 17,
    fontWeight: '400',
    letterSpacing: 0.3,
    lineHeight: 20,
  } as TextStyle,
  heading: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 36,
  } as TextStyle,
};
type Presets = keyof typeof presets;

export type TextProps = ThemeProps &
  DefaultText['props'] & {
    preset?: Presets;
  };
export function Text(props: TextProps) {
  const { preset = 'secondary', style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const textStyle = [presets[preset], { color }, style] as TextStyle;

  return <DefaultText style={textStyle} {...otherProps} />;
}
