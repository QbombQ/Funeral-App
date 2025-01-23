import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';


export type ThemedTextVariant =
  | 'title32'
  | 'title30'
  | 'title28'
  | 'title26'
  | 'title24'
  | 'title22'
  | 'title20'
  | 'title19'
  | 'title18'
  | 'title16'
  | 'title14'
  | 'title12'
  | 'title10';


const FONT_SIZE_MAP: Record<ThemedTextVariant, number> = {
  title32: 32,
  title30: 30,
  title28: 28,
  title26: 26,
  title24: 24,
  title22: 22,
  title20: 20,
  title19: 19,
  title18: 18,
  title16: 16,
  title14: 14,
  title12: 12,
  title10: 10,
};

export interface ThemedTextProps extends TextProps {

  variant?: ThemedTextVariant;


  textcolor?: string;


  fontFamily?: string;
}

export function ThemedText({
  style,
  variant = 'title16', 
  textcolor,
  fontFamily = 'RalewayRegular',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: textcolor }, 'text');

  return (
    <Text
      style={[
        styles.base,
        {
          color,
          fontFamily,
          fontSize: FONT_SIZE_MAP[variant],
        },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {

  },
});
