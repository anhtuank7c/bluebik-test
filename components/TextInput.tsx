import { View, ViewStyle, TouchableOpacity } from 'react-native';
import MaskedTextInput, { MaskInputProps } from 'react-native-mask-input';
import Layout from 'constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import { useCallback } from 'react';
import { Text } from './Text';
import { ThemeProps, useThemeColor } from './Themed';

export type TextInputProps = ThemeProps &
  MaskInputProps & {
    label: string;
    containerStyle?: ViewStyle;
    borderProps?: ThemeProps;
    textInputProps?: ThemeProps;
    iconProps?: ThemeProps;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightIconPress?: () => void;
  };
const container = {
  paddingHorizontal: Layout.spacing.lg,
} as ViewStyle;
const base = {
  height: Layout.button,
  paddingHorizontal: Layout.spacing.lg,
  fontSize: 17,
  letterSpacing: 0.3,
  fontWeight: '400',
  flexShrink: 1,
  flexGrow: 1,
} as MaskInputProps['style'];
const inputContainer = {
  borderWidth: 1,
  borderRadius: Layout.button,
  overflow: 'hidden',
  flexDirection: 'row',
} as ViewStyle;

export function TextInput(props: TextInputProps) {
  const {
    label,
    style,
    containerStyle,
    lightColor,
    darkColor,
    borderProps,
    textInputProps,
    rightIcon,
    iconProps,
    onRightIconPress,
    ...otherTextInputProps
  } = props;
  const color = useThemeColor(
    { light: textInputProps?.lightColor, dark: textInputProps?.darkColor },
    'textInput',
  );
  const iconColor = useThemeColor(
    { light: iconProps?.lightColor, dark: iconProps?.darkColor },
    'text',
  );
  const borderColor = useThemeColor(
    { light: borderProps?.lightColor, dark: borderProps?.darkColor },
    'textInputBorder',
  );
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'textInputBg');
  const hasIconRight = typeof rightIcon === 'string';
  const textInputStyle = [base, { color }, hasIconRight && { paddingRight: 0 }, style];

  const renderIcon = useCallback(() => {
    if (!rightIcon) {
      return null;
    }
    return (
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onRightIconPress}
        style={{ width: Layout.button, justifyContent: 'center', alignItems: 'center' }}
      >
        <Ionicons name={rightIcon} size={24} color={iconColor} />
      </TouchableOpacity>
    );
  }, [rightIcon, iconColor, onRightIconPress]);

  return (
    <View style={[container, containerStyle]}>
      <Text style={{ paddingHorizontal: Layout.spacing.lg, paddingBottom: Layout.spacing.sm }}>
        {label}
      </Text>
      <View style={[inputContainer, { borderColor, backgroundColor }]}>
        <MaskedTextInput {...otherTextInputProps} style={textInputStyle} />
        {renderIcon()}
      </View>
    </View>
  );
}
