import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const { width: SW, height: SH } = Dimensions.get('screen');

export default {
  window: {
    width,
    height,
  },
  screen: {
    width: SW,
    height: SH,
  },
  isSmallDevice: width < 375,
  spacing: {
    xxs: 1,
    xs: 2,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
  button: 50,
  notification: 68,
  checkbox: 44,
  image: {
    sizes: {
      xs: 30,
      sm: 40,
      md: 50,
      lg: 60,
      xl: 100,
      xxl: 140,
      xxxl: 180,
      fullWidth: width,
    },
    roundeds: {
      none: 0,
      light: 4,
      normal: 8,
      medium: 68,
      huge: 1000,
    },
  },
};
