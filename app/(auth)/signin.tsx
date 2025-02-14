import React, { useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import tw from "twrnc";
import AuthBackground from '@/components/background/AuthBackground';
import FormInput from '@/components/input/FormInput';
import { router } from "expo-router"
import { PrimaryButton } from '@/components/button/PrimaryButton';
import { SocialAuthButton } from '@/components/button/SocialAuthButton';
import SwitchForm from '@/components/input/SwitchForm';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import axiosInstance from "../../context/api";
import { useAuth } from "@/context/AuthContext";
import { connectSocket } from '@/context/socket';

export default function Index() {

  const { login } = useAuth();

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const tosignin = () => {
    router.push("/(auth)")
  }
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };
  const setSignin = async () => {
    if (!email || !validateEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
      });
      return;
    }

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
    const data = { email, password };

    try {
      const response = await axiosInstance.post("/login", data);

      if (response.data.message === "success") {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You have successfully logged in.',
        });
        const token = response.data.token;
        const userId = response.data.email;
        // await SecureStore.setItemAsync("userToken", response.data.token);
        await login(token, userId);
        connectSocket(email);
        router.replace("/(home)/home");
      } else if (response.data.message === "No exists user.") {
        Toast.show({
          type: "error",
          text1: "User Not Found",
          text2: "No account is associated with this email. Please check your email or sign up.",
        });

        setLoading(false)
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Invalid username or password',
          text2: 'You have used incorrect email or password. Please try again.',
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
              Sign In
            </ThemedText>
          </View>
          <View style={tw`mt-[10%] w-full py-[15px] px-9 gap-[9px] flex flex-col justify-center items-center relative`}>
            <View style={tw`absolute inset-0 rounded-xl bg-[#FAFAFA] opacity-3`}></View>
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
              style={tw`flex flex-row w-[325px] gap-[4px] justify-start`}
            >

              <SwitchForm />
              <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                Remember
              </ThemedText>
            </View>

          </View>
          <View
            style={tw`mt-[25px] flex flex-col gap-[18px] w-full justify-center`}
          >
            <PrimaryButton text='Sign In' onPress={setSignin} />
            <TouchableOpacity style={tw`flex justify-center items-center`}>
              <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                or sign in with
              </ThemedText>
            </TouchableOpacity>
            <SocialAuthButton provider='google' action='signIn' setLoading={setLoading} />
            <SocialAuthButton provider='apple' action='signIn' setLoading={setLoading} />

            <View
              style={tw`w-full flex justify-center items-center`}
            >
              <View
                style={tw`flex flex-row gap-[5px]`}
              >
                <ThemedText variant='title12' textcolor='#C2C2C2' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                  Didn&apos;t have an account?
                </ThemedText>
                <TouchableOpacity
                  onPress={tosignin}
                >
                  <ThemedText variant='title12' textcolor='#004CFF' style={[tw`opacity-90`, { fontFamily: "NunitoRegular" }]}>
                    Sign Up
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    </AuthBackground>
  );
}
