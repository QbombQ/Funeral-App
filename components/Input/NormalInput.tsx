import React from 'react';
import { View, TextInput, Image } from 'react-native';
import tw from 'twrnc'; 

interface NormalInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const NormalInput: React.FC<NormalInputProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  return (
    <View style={tw`w-full h-[48px]`}>
      <Image source={require('@/assets/images/normalinputform.png')} style={tw`absolute w-full`} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#C2C2C2"
        value={value}
        onChangeText={onChangeText}
        style={[
          tw`w-full h-full pt-[15px] bg-none text-bottom z-5 px-[5px] text-[#C2C2C2] border-b border-[#004CFF] text-sm`,
          { fontFamily: 'PoppinsMedium' },
        ]}
      />
    </View>
  );
};

export default NormalInput;
