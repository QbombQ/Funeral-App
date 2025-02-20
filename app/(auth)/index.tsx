import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator
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
import axios from "axios";
// import * as Notifications from 'expo-notifications';
import Toast from 'react-native-toast-message';
import axiosInstance from '@/context/api';
import Expo from "expo";


export default function Index() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);


  const tosignin = () => {
    router.push("/(auth)/signin")

  }
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };
  const setSignup = async () => {
    if (!name) {
      Toast.show({
        type: "error",
        text1: "Invalid Name",
        text2: "Name value can't be empty.",
      });
      return;
    }

    // ✅ Email validation
    if (!email || !validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    // ✅ Password validation
    if (!password) {
      Toast.show({
        type: "error",
        text1: "Password error",
        // text2: "Password must be at least 6 characters long and include an uppercase letter, a number, and a special character.",
        text2: "You have to enter the password.",
      });
      return;
    }
    setLoading(true)
    const data = { name, email, password };

    try {
      const response = await axiosInstance.post("/signup", data);

      if (response.data.message === "success") {
        Toast.show({
          type: 'success',
          text1: 'Signup Successful 🎉',
          text2: 'Your account has been created!',
        });
        router.push("/(auth)/signin")
      } else if (response.data.message === "email is already exist!") {
        Toast.show({
          type: "error",
          text1: "Signup Failed",
          text2: "This email might already be in use.",
        });
        setLoading(false)

      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: 'This username might already be in use.',
        });
        setLoading(false)

      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Something went wrong. Please try again later.',
      });
      setLoading(false)

    }
  };

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
          <View style={tw`mt-[40px] w-full py-[15px] px-9 gap-[9px] flex flex-col justify-center items-center relative`}>
            <View style={tw`absolute inset-0 rounded-xl bg-[#FAFAFA] opacity-3 mx-3`}></View>
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
            {/* <View
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
            </View> */}
          </View>
          <View
            style={tw`mt-[25px] flex flex-col gap-[18px] w-full justify-center items-center`}
          >
            <PrimaryButton text='Sign Up' onPress={setSignup} />
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                or sign up with
              </ThemedText>
            </TouchableOpacity>
            <SocialAuthButton provider='google' action='signUp' setLoading={setLoading} />
            <SocialAuthButton provider='apple' action='signUp' setLoading={setLoading} />

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
        {
          loading &&
          <>
            <View
              style={tw`w-full flex-1 justify-center items-center absolute h-full bg-black bg-opacity-30`}
            >

              <ActivityIndicator size="large" color="#004CFF" />
            </View>

          </>
        }
      </ScrollView>
    </AuthBackground>
  );
}
