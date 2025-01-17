import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Switch
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import tw from "twrnc";
import AuthBackground from '@/components/AuthBackground';
import FormInput from '@/components/FormInput';
import { CheckBox, Icon } from '@rneui/themed';
import {router} from "expo-router"
export default function Index() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const tosignin = () => {
    router.push("/(auth)/signin")
  }
  return (
    <AuthBackground title=''>
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        style={tw`w-full h-full`}
      >
        <View style={tw`w-full flex flex-col items-center`}>
          <View style={tw`pt-[27%]`}>
            <ThemedText type='rebold' textcolor='#FFFFFF'>
              Sign In
            </ThemedText>
          </View>
          <View style={tw`mt-[100px] py-[15px] px-[8px] gap-[9px] flex flex-col justify-center items-center relative`}>
            <View style={tw`absolute inset-0 rounded-xl bg-[#FAFAFA] opacity-3`}></View>
            {/* <FormInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            /> */}

            <FormInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <FormInput
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {/* <View
              style={tw`flex flex-row gap-[12px] w-[325px] items-center`}
            >
              <CheckBox
                checked={check}
                onPress={() => setCheck(!check)}
                checkedIcon={
                  <Icon
                    type="font-awesome"
                    name="dot-circle-o"
                    size={20}
                    color="#139AD6"
                  />
                }
                uncheckedIcon={
                  <Icon
                    type="font-awesome"
                    name="circle-o"
                    size={20}
                    color="#BAC1C4"
                  />
                }
                containerStyle={tw`bg-transparent p-0 m-0 border-0`}
                wrapperStyle={tw`bg-transparent p-0 m-0`}
              />
              <ThemedText type='nuregular' textcolor='#C2C2C2' style={tw`opacity-90`}>
                Terms of service and privacy policy
              </ThemedText>
            </View> */}
            <View
              style={tw`flex flex-row w-[325px] items-center`}
            >
              <Switch
                trackColor={{ false: '#FFFFFF', true: '#004CFF' }}
                thumbColor={"#FFFFFF"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <ThemedText type='nuregular' textcolor='#C2C2C2' style={tw`opacity-90`}>
                Remember
              </ThemedText>
            </View>
          </View>
          <View
            style={tw`mt-[25px] flex flex-col gap-[18px] w-full justify-center`}
          >
            <View
              style={tw`w-full flex justify-center items-center`}
            >
              <TouchableOpacity
                style={tw`w-[283px] h-[50px] flex flex-row justify-center items-center  border border-[#004CFF] rounded-[56px]`}
              >
                {/* <View style={tw`absolute w-full h-full bg-[#004CFF] opacity-30 rounded-[56px]`} /> */}
                <Image source={require('@/assets/images/01. Primary Button.png')} style={tw`w-full h-full absolute top-0 left-0`} />
                <ThemedText type='numedium' textcolor='#F6FBFD'>
                  Sign In
                </ThemedText>
              </TouchableOpacity>

            </View>
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <ThemedText type='nuregular' textcolor='#C2C2C2' style={tw`opacity-90`}>
                or sign in with
              </ThemedText>
            </TouchableOpacity>
            <View
              style={tw`w-full flex items-center`}
            >
              <View
                style={tw`w-[335px] h-[49px] border border-[#004CFF] rounded-[56px] flex flex-row gap-[12px] justify-center items-center`}
              >
                <Image source={require('@/assets/images/authbtn.png')} style={tw`w-full h-full absolute`} />
                <Image source={require('@/assets/images/google.png')} />
                <ThemedText type='nusemibold' textcolor='#95989A'>
                  Sign In with Google
                </ThemedText>
              </View>

            </View>
            <View
              style={tw`w-full flex items-center`}
            >
              <View
                style={tw`w-[335px] h-[49px] border border-[#004CFF] rounded-[56px] flex flex-row gap-[12px] justify-center items-center`}
              >
                <Image source={require('@/assets/images/authbtn.png')} style={tw`w-full h-full absolute`} />
                <Image source={require('@/assets/images/apple.png')} />
                <ThemedText type='nusemibold' textcolor='#95989A'>
                  Sign In with Apple
                </ThemedText>
              </View>

            </View>
            <View
              style={tw`w-full flex justify-center items-center`}
            >
              <View
                style={tw`flex flex-row gap-[5px]`}
              >
                <ThemedText type='nuregular' textcolor='#C2C2C2' style={tw`opacity-90`}>
                Didn&apos;t have an account?
                </ThemedText>
                <TouchableOpacity
                  onPress={tosignin}
                >
                  <ThemedText type='nuregular' textcolor='#004CFF' style={tw`opacity-90`}>
                   Sign Up
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AuthBackground>
  );
}
