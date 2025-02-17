import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '@/components/ThemedText';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import axiosInstance from '@/context/api';
import config from "@/config.json";
import { GoogleSignin } from './GoogleSignin';
import { useAuth } from "@/context/AuthContext";
import { connectSocket } from '@/context/socket';
import { router } from "expo-router"
import Toast from 'react-native-toast-message';
import { useNavigationContext } from '@/context/NavigationContext';

type SocialAuthButtonProps = {
  provider: 'google' | 'apple';
  action?: 'signIn' | 'signUp';
  onSuccess?: (token: string) => void;
  setLoading?: (loading: boolean) => void;
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  action = 'signUp',
  onSuccess,
  setLoading
}) => {
  const label = `${action === 'signIn' ? 'Sign In' : 'Sign Up'} with ${provider === 'google' ? 'Google' : 'Apple'
    }`;

  const iconSource =
    provider === 'google'
      ? require('@/assets/images/google.png')
      : require('@/assets/images/apple.png');


  const { login } = useAuth();
  const { selectedTab, setSelectedTab } = useNavigationContext();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [isSigninInProgress, setIsSigninInProgress] = useState<any>(false);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     GoogleSignin.configure({
  //       webClientId: "361140166748-492betprlmcevc7f77n21up6qjv6f046.apps.googleusercontent.com",
  //       // androidClientId:"361140166748-jgu1ofin98ddrlv083ss722g4v0njkqo.apps.googleusercontent.com",
  //       // iosClientId: "361140166748-jgu1ofin98ddrlv083ss722g4v0njkqo.apps.googleusercontent.com",
  //       offlineAccess: true,
  //     } as any);

  //     const serviceInfo = await GoogleSignin.hasPlayServices();
  //     // console.log("service info:::", serviceInfo);

  //     const userInfo = await GoogleSignin.signIn();
  //     // console.log(`google>>>>>`, JSON.stringify(userInfo, null, 2));
  //     if (userInfo) {
  //       signUpWithGoogle(userInfo);
  //       // console.log("return value is success:::", userInfo)
  //     }
  //   }
  //   catch (error: any) {
  //     console.warn(error);
  //     if (Platform.OS !== `ios`) {
  //       alert(error);
  //     }
  //     // setLoadingGoogleToken(false);
  //   };
  // };
  const handleGoogleSignIn = async () => {
    setLoading?.(true)
    try {
      GoogleSignin.configure({
        webClientId: "361140166748-492betprlmcevc7f77n21up6qjv6f046.apps.googleusercontent.com",
        iosClientId:"361140166748-bmj9mrcq3ffj1coqvhd0lv9l0hht4jcq.apps.googleusercontent.com",
        offlineAccess: true,
      } as any);

      await GoogleSignin.signOut();

      const serviceInfo = await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      setLoading?.(false)
      if (userInfo) {
        signUpWithGoogle(userInfo);
        // setLoading?.(false)
      }
    } catch (error: any) {
      if (Platform.OS !== `ios`) {
        alert(error);
      }
    }
  };
  const handleAppleSignIn = async () => {
    try {
      setIsSigninInProgress(true);

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        signUpWithApple(credential);
      }
    } catch (error: any) {
      console.warn("Apple Sign-In Error:", error);
      if (error.code === 'ERR_CANCELED') {
        alert('Apple Sign-In was canceled.');
      } else {
        alert('Apple Sign-In failed. Try again.');
      }
    } finally {
      setIsSigninInProgress(false);
    }
  };
  const signUpWithGoogle = async (googleUserInfor: any) => {
    const fomrdata = {
      action: `${action}`,
      username: `${googleUserInfor.data.user.name}`,
      email: `${googleUserInfor.data.user.email}`,
    }
    try {
      const response = await axiosInstance.post("/google-login", fomrdata)
      if (response.data.message == "success") {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'You have successfully logged in.',
        });
        await login(response.data.token, response.data.email);
        connectSocket(response.data.email);
        setSelectedTab('home');
        router.replace("/(home)/home");
        // setLoading?.(false)

      }
    } catch (error) {
        setLoading?.(false)

    }

  }
  const signUpWithApple = async (appleUserInfo: any) => {
    const formData = {
      action: `${action}`,
      username: appleUserInfo.fullName?.givenName || "Apple User",
      email: appleUserInfo.email || "",
      appleUserId: appleUserInfo.user, // Unique Apple User ID
    };

    try {
      const response = await axiosInstance.post("/apple-login", formData);
      if (response.data.message === "success") {
        handleLoginSuccess(response.data);
      }
    } catch (error) {
      console.error("Apple Sign-In Request Failed:", error);
    }
  };
  const handleLoginSuccess = async (data: any) => {
    Toast.show({
      type: 'success',
      text1: 'Login Successful',
      text2: 'You have successfully logged in.',
    });

    await login(data.token, data.email);
    connectSocket(data.email);
    router.replace("/(home)/home");
  };

  const handleSignIn = () => {
    if (provider === 'google') {
      handleGoogleSignIn();
    } else if (provider === 'apple') {
      handleAppleSignIn();
    }
  };
  return (
    <View style={tw`w-full flex items-center`}>
      <TouchableOpacity
        onPress={handleSignIn}
        style={tw`w-[335px] h-[49px] border border-[#004CFF] rounded-[56px] flex flex-row gap-[12px] justify-center items-center`}
      >
        <Image
          source={require('@/assets/images/authbtn.png')}
          style={tw`w-full h-full absolute`}
        />
        <Image source={iconSource} />
        <ThemedText variant="title16" textcolor="#95989A" style={{ fontFamily: 'NunitoSemiBold' }}>
          {label}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};


