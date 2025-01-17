import React from 'react';
import { TouchableOpacity, View, Image, StyleProp, ViewStyle } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '@/components/ThemedText';

type PrimaryButtonProps = {
  width?: number;
  height?: number;
  text:string;
  onPress?: () => void;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  width,
  height,
  text,
  onPress,
}) => {
  return (
    <View style={tw`w-full flex justify-center items-center`}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          tw`w-[283px] h-[50px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px]`,
          {
            width: width ?? 283,
            height: height ?? 50,
          },
        ]}
      >
        <Image
          source={require('@/assets/images/01. Primary Button.png')}
          style={tw`w-full h-full absolute top-0 left-0`}
        />
        <ThemedText variant='title16' textcolor='#F6FBFD' style={{fontFamily:"NunitoMedium"}}>
          {text}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
