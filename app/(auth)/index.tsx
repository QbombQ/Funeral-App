import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import tw from "twrnc";
import AuthBackground from '@/components/background/AuthBackground';
import FormInput from '@/components/input/FormInput';
import { ThemedCheckBox } from '@/components/input/ThemedCheckBox';
import { router } from "expo-router"
import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SocialAuthButton } from '@/components/button/SocialAuthButton';
import SwitchForm from "@/components/input/SwitchForm";

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
  const toOnboarding = () => {
    router.push('/(auth)/onboarding')
  }
  return (
    <AuthBackground title=''>
      <ScrollView
        contentContainerStyle={tw`flex-grow`}
        style={tw`w-full h-full`}
      >
        <View style={tw`w-full flex flex-col items-center pb-[20px]`}>
          <View style={tw`pt-[27%]`}>
            <ThemedText variant='title32' textcolor='#FFFFFF' style={{ fontFamily: "RalewayBold" }}>
              Create Your Account
            </ThemedText>
          </View>
          <View style={tw`mt-[40px] py-[15px] px-[8px] gap-[9px] flex flex-col justify-center items-center relative`}>
            <View style={tw`absolute inset-0 rounded-xl bg-[#FAFAFA] opacity-3`}></View>
            <FormInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />

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
            <View
              style={tw`flex flex-row gap-[12px] w-[325px] items-center`}
            >
              <ThemedCheckBox
                checked={check}
                onPress={() => setCheck(!check)}
                checkedColor="#1E90FF"
                uncheckedColor="#808080"
                size={20}
              />
              <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                Terms of service and privacy policy
              </ThemedText>
            </View>
            <View
              style={tw`flex flex-row w-[325px] gap-[4px] justify-center`}
            >

              <SwitchForm />
              <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                Allow location access to find nearby funeral homes
              </ThemedText>
            </View>
          </View>
          <View
            style={tw`mt-[25px] flex flex-col gap-[18px] w-full justify-center items-center`}
          >
            <PrimaryButton text='Sign Up' onPress={toOnboarding} />
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                or sign up with
              </ThemedText>
            </TouchableOpacity>
            <SocialAuthButton provider='google' action='signUp' />
            <SocialAuthButton provider='apple' action='signUp' />

            <View
              style={tw`w-full flex justify-center items-center`}
            >
              <View
                style={tw`flex flex-row gap-[5px]`}
              >
                <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                  Already have an account?
                </ThemedText>
                <TouchableOpacity
                  onPress={tosignin}
                >
                  <ThemedText variant='title12' textcolor='#004CFF' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                    Sign In
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
