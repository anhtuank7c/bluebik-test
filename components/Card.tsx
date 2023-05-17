import { ViewStyle, ViewProps, View } from 'react-native';
import { ThemeProps, useThemeColor } from './Themed';

const roundeds = {
  none: { borderRadius: 0 } as ViewStyle,
  light: { borderRadius: 5 } as ViewStyle,
  normal: { borderRadius: 10 } as ViewStyle,
  medium: { borderRadius: 17 } as ViewStyle,
  huge: { borderRadius: 56 } as ViewStyle,
};
type Roundeds = keyof typeof roundeds;
export type CardProps = ThemeProps &
  ViewProps & {
    rounded?: Roundeds;
  };
export function Card(props: CardProps) {
  const { rounded = 'none', style, lightColor, darkColor, ...otherViewProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'card');
  const cardStyle = [roundeds[rounded], { backgroundColor }, style];
  return <View style={cardStyle} {...otherViewProps} />;
}
