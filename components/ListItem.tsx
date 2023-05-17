import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Layout from 'constants/Layout';
import { useCallback } from 'react';
import { ThemeProps, useThemeColor } from './Themed';
import { Text } from './Text';

const base = {
  height: Layout.button,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: Layout.spacing.lg,
} as StyleProp<ViewStyle>;
export type ListItemProps = ThemeProps &
  PressableProps & {
    title: string;
    value?: boolean;
    onChangeValue?: (newValue: boolean) => void;
  };
export function ListItem(props: ListItemProps) {
  const { title, value, onChangeValue, lightColor, darkColor, style, ...otherPressableProps } =
    props;
  const name = value ? 'checkbox' : 'square-outline';
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const handleToggle = useCallback(() => {
    if (typeof onChangeValue === 'function') {
      onChangeValue(!value);
    }
  }, [onChangeValue, value]);

  return (
    <Pressable style={[base, style]} onPress={handleToggle} {...otherPressableProps}>
      <Text style={{ flexGrow: 1, flexShrink: 1 }}>{title}</Text>
      <Ionicons name={name} size={24} color={color} />
    </Pressable>
  );
}
