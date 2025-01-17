import React from 'react';
import { View, TouchableOpacity, Image, GestureResponderEvent } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '@/components/ThemedText';

type SocialAuthButtonProps = {
  provider: 'google' | 'apple';
  action?: 'signIn' | 'signUp';
  onPress?: (event: GestureResponderEvent) => void;
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  action = 'signUp',
  onPress,
}) => {
  const label = `${action === 'signIn' ? 'Sign In' : 'Sign Up'} with ${
    provider === 'google' ? 'Google' : 'Apple'
  }`;
  const iconSource =
    provider === 'google'
      ? require('@/assets/images/google.png')
      : require('@/assets/images/apple.png');

  return (
    <View style={tw`w-full flex items-center`}>
      <TouchableOpacity
        onPress={onPress}
        style={tw`w-[335px] h-[49px] border border-[#004CFF] rounded-[56px] flex flex-row gap-[12px] justify-center items-center`}
      >
        <Image
          source={require('@/assets/images/authbtn.png')}
          style={tw`w-full h-full absolute`}
        />
        <Image source={iconSource} />
        <ThemedText variant="title16" textcolor="#95989A" style={{fontFamily:"NunitoSemiBold"}}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};
