import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '@/components/ThemedText';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import axiosInstance from '@/context/api';
import config from "@/config.json";

type SocialAuthButtonProps = {
  provider: 'google' | 'apple';
  action?: 'signIn' | 'signUp';
  onSuccess?: (token: string) => void;
};

export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
  provider,
  action = 'signUp',
  onSuccess,
}) => {
  const label = `${action === 'signIn' ? 'Sign In' : 'Sign Up'} with ${provider === 'google' ? 'Google' : 'Apple'
    }`;

  const iconSource =
    provider === 'google'
      ? require('@/assets/images/google.png')
      : require('@/assets/images/apple.png');

  // Google login configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    // iosClientId: '156696857100-der6btvcv57jqlit5ei2grqvsh3lfk5v.apps.googleusercontent.com',
    androidClientId: '361140166748-492betprlmcevc7f77n21up6qjv6f046.apps.googleusercontent.com',
    webClientId: '361140166748-492betprlmcevc7f77n21up6qjv6f046.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
    responseType: 'token',
    redirectUri: makeRedirectUri({
      native: 'com.anonymous.FuneralApp:/oauth2redirect/google',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const fetchUserInfo = async () => {
        try {
          const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          const userInfo = await userInfoResponse.json();
          console.log('User Info:', userInfo);
          if (onSuccess) onSuccess(access_token);
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      fetchUserInfo();
      const signInWithBackend = async (token: string) => {
        try {
          const backendResponse = await axiosInstance.post('/google-login', { token });
          if (backendResponse.data.token && onSuccess) {
            onSuccess(backendResponse.data.token);
          } else {
            console.error('Google authentication failed:', backendResponse.data.message);
          }
        } catch (error) {
          console.error('Error communicating with backend:', error);
        }
      };
      signInWithBackend(access_token);
    }
  }, [response]);

  // Handle Apple Sign-In
  const handleAppleSignIn = async () => {
    try {
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const backendResponse = await axiosInstance.post('/apple-login', {
        token: appleCredential.identityToken,
        user: appleCredential.fullName,
      });

      if (backendResponse.data.token && onSuccess) {
        onSuccess(backendResponse.data.token);
      } else {
        console.error('Apple authentication failed:', backendResponse.data.message);
      }
    } catch (error) {
      console.error('Error with Apple authentication:', error);
    }
  };

  const handleSignIn = () => {
    if (provider === 'google' && request) {
      promptAsync();
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



// import React, { useEffect } from 'react';
// import { View, TouchableOpacity, Image } from 'react-native';
// import tw from 'twrnc';
// import { ThemedText } from '@/components/ThemedText';
// import * as Google from 'expo-auth-session/providers/google';
// import { makeRedirectUri } from 'expo-auth-session';
// import * as AppleAuthentication from 'expo-apple-authentication';
// import axiosInstance from '@/context/api';
// import config from "@/config.json";
// import {
//   GoogleSignin,
//   statusCodes,
//   isErrorWithCode,
//   isSuccessResponse,
//   isNoSavedCredentialFoundResponse,
// } from '@react-native-google-signin/google-signin';

// type SocialAuthButtonProps = {
//   provider: 'google' | 'apple';
//   action?: 'signIn' | 'signUp';
//   onSuccess?: (token: string) => void;
// };

// export const SocialAuthButton: React.FC<SocialAuthButtonProps> = ({
//   provider,
//   action = 'signUp',
//   onSuccess,
// }) => {
//   const label = `${action === 'signIn' ? 'Sign In' : 'Sign Up'} with ${provider === 'google' ? 'Google' : 'Apple'
//     }`;

//   const iconSource =
//     provider === 'google'
//       ? require('@/assets/images/google.png')
//       : require('@/assets/images/apple.png');

//   // Google login configuration
//   // const [request, response, promptAsync] = Google.useAuthRequest({
//   //   iosClientId: '156696857100-der6btvcv57jqlit5ei2grqvsh3lfk5v.apps.googleusercontent.com',
//   //   androidClientId: '156696857100-2mjsgh5vphhq6tm0eqog2suunod5g8c7.apps.googleusercontent.com',
//   //   webClientId: '156696857100-re4r7tl9ojvotvhf48ka4keqtns6k9mo.apps.googleusercontent.com',
//   //   scopes: ['openid', 'profile', 'email'],
//   //   responseType: 'token',
//   //   redirectUri: makeRedirectUri({
//   //     native: 'com.anonymous.FuneralApp:/oauth2redirect/google',
//   //   }),
//   // });

//   // useEffect(() => {
//   //   if (response?.type === 'success') {
//   //     const { access_token } = response.params;
//   //     const fetchUserInfo = async () => {
//   //       try {
//   //         const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
//   //           headers: { Authorization: `Bearer ${access_token}` },
//   //         });
//   //         const userInfo = await userInfoResponse.json();
//   //         console.log('User Info:', userInfo);
//   //         if (onSuccess) onSuccess(access_token);
//   //       } catch (error) {
//   //         console.error('Error fetching user info:', error);
//   //       }
//   //     };

//   //     fetchUserInfo();
//   //     const signInWithBackend = async (token: string) => {
//   //       try {
//   //         const backendResponse = await axiosInstance.post('/google-login', { token });
//   //         if (backendResponse.data.token && onSuccess) {
//   //           onSuccess(backendResponse.data.token);
//   //         } else {
//   //           console.error('Google authentication failed:', backendResponse.data.message);
//   //         }
//   //       } catch (error) {
//   //         console.error('Error communicating with backend:', error);
//   //       }
//   //     };
//   //     signInWithBackend(access_token);
//   //   }
//   // }, [response]);
//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const response = await GoogleSignin.signIn();

//       if (isSuccessResponse(response)) {
//         // read user's info
//         console.log(response.data);
//       } else if (isNoSavedCredentialFoundResponse(response)) {
//         // Android and Apple only.
//         // No saved credential found (user has not signed in yet, or they revoked access)
//         // call `createAccount()`
//       }else if (response.type === 'cancelled') {
//         // Handle the cancelled case separately
//         console.log("User cancelled the operation.");
//       } else {
//         // Handle unexpected response types, potentially logging an error
//         console.error("Unexpected response type:", response.type);
//       }
//     } catch (error) {
//       console.error(error);
//       if (isErrorWithCode(error)) {
//         switch (error.code) {
//           case statusCodes.SIGN_IN_CANCELLED:
//             // Handle cancel
//             break;
//           case statusCodes.IN_PROGRESS:
//             // Handle in progress
//             break;
//           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//             // Handle play services not available
//             break;
//           case statusCodes.SIGN_IN_REQUIRED:
//             // Handle sign in required
//             break;
//           default:
//             // Handle unexpected errors
//             console.error("Unhandled error code:", error.code);
//         }
//       } else {
//         // an error that's not related to google sign in occurred
//       }
//     }

//   }
//     // Handle Apple Sign-In
//     const handleAppleSignIn = async () => {
//       try {
//         const appleCredential = await AppleAuthentication.signInAsync({
//           requestedScopes: [
//             AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
//             AppleAuthentication.AppleAuthenticationScope.EMAIL,
//           ],
//         });

//         const backendResponse = await axiosInstance.post('/apple-login', {
//           token: appleCredential.identityToken,
//           user: appleCredential.fullName,
//         });

//         if (backendResponse.data.token && onSuccess) {
//           onSuccess(backendResponse.data.token);
//         } else {
//           console.error('Apple authentication failed:', backendResponse.data.message);
//         }
//       } catch (error) {
//         console.error('Error with Apple authentication:', error);
//       }
//     };

//     const handleSignIn = () => {
//       if (provider === 'google') {
//         signIn();
//       } else if (provider === 'apple') {
//         handleAppleSignIn();
//       }
//     };

//     return (
//       <View style={tw`w-full flex items-center`}>
//         <TouchableOpacity
//           onPress={handleSignIn}
//           style={tw`w-[335px] h-[49px] border border-[#004CFF] rounded-[56px] flex flex-row gap-[12px] justify-center items-center`}
//         >
//           <Image
//             source={require('@/assets/images/authbtn.png')}
//             style={tw`w-full h-full absolute`}
//           />
//           <Image source={iconSource} />
//           <ThemedText variant="title16" textcolor="#95989A" style={{ fontFamily: 'NunitoSemiBold' }}>
//             {label}
//           </ThemedText>
//         </TouchableOpacity>
//       </View>
//     );
//   };
