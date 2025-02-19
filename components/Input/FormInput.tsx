import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import ShowIcon from '../icons/ShowIcon';
import HiddenIcon from '../icons/HiddenIcon';

const FormInput = ({
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
  additionalStyles = {},
  ...props
}: any) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  return (
    <View style={[tw`w-full h-[50px]`, additionalStyles]}>
      <Image
        source={require("@/assets/images/Form.png")}
        style={tw`absolute top-0 left-0 z-[2] w-full h-full rounded-full`}
      />
      <View style={tw`absolute bg-[#004CFF] top-0 w-full h-full rounded-[56px] z-[1] opacity-10`}>
      </View>

      {secureTextEntry ? (
        <View style={tw`flex flex-row items-center h-full`}>
          <TextInput
            placeholder={placeholder}
            secureTextEntry={isPasswordHidden}
            placeholderTextColor="#C2C2C2"
            value={value}
            onChangeText={onChangeText}
            style={[
              tw`w-full h-full bg-none text-bottom z-[5] rounded-[56px] px-[24px] text-[#C2C2C2] border border-[#004CFF] text-sm`,
              { fontFamily: "PoppinsMedium" },
            ]}
            {...props}
          />
          <TouchableOpacity
            style={tw`absolute right-[25px]`}
            onPress={togglePasswordVisibility}
            activeOpacity={0.7}
          >
            {isPasswordHidden ? <ShowIcon /> : <HiddenIcon />}
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#C2C2C2"
          value={value}
          onChangeText={onChangeText}
          style={[
            tw`w-full h-full bg-none text-bottom z-[5] rounded-[56px] px-[24px] text-[#C2C2C2] border border-[#004CFF] text-sm`,
            { fontFamily: "PoppinsMedium" },
          ]}
          {...props}
        />
      )}
    </View>
  );
};

export default FormInput;
