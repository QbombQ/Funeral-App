import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  // lightColor?: string;
  textcolor?: string;
  type?: 'retitle'|'rebold'| 'nutitle'| 'numedium' | 'nuregular'| 'nusemibold' | 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  // lightColor,
  // darkColor,
  textcolor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: textcolor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'rebold' ? styles.rebold : undefined,
        type === 'retitle' ? styles.retitle : undefined,
        type === 'nuregular' ? styles.nuregular : undefined,
        type === 'nutitle' ? styles.nutitle : undefined,
        type === 'numedium' ? styles.numedium : undefined,
        type === 'nusemibold' ? styles.nusemibold : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  rebold: {
    fontSize: 32,
    // lineHeight: 24,
    fontFamily:"RalewayBold"
  },
  retitle: {
    fontSize: 24,
    lineHeight: 26,
    fontFamily:"RalewayBold"
  },
  nutitle: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily:"NunitoMedium"
  },
  numedium:{
    fontSize:16,
    // lineHeight:24,
    fontFamily:"NunitoMedium"
  },
  nusemibold:{
    fontSize:16,
    // lineHeight:24,
    fontFamily:"NunitoBold"
  },
  nuregular:{
    fontSize:12,
    // lineHeight:24,
    fontFamily:"NunitoRegular"
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
