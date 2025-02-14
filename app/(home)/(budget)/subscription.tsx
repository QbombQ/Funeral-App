import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import axiosInstance from '@/context/api';
import tw from 'twrnc';
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import { NormalButton } from '@/components/button/NormalButton';
import PaymentModal from '@/components/modal/PaymentModal';
import { useAuth } from '@/context/AuthContext';
export default function Subscription() {
  const { userId } = useAuth()
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [userSubscription, setUserSubscription] = useState<any>(null);
  const [userFullAccess, setUserFullAccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const getUserData = async () => {
    const formdata = {
      userId: userId
    }
    const response = await axiosInstance.post("/getUserData", formdata);
    if (response.data.message == "success") {
      setUserData(response.data.data);
      setUserFullAccess(response.data.data.isFullAccess);
      setUserSubscription(response.data.data.subscription);
    }
  };
  useEffect(() => {
    getUserData()
  }, [])
  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/transaction/create-order', { userId });
      const { approvalUrl } = response.data;
      if (approvalUrl) {
        setApprovalUrl(approvalUrl);
        setModalVisible(true);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to initiate payment.',
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to initiate payment.',
      });
    }
  };

  const onPaymentSuccess = async (orderID: any) => {
    setModalVisible(false);
    setLoading(true);
    try {
      const response = await axiosInstance.post('/transaction/capture-order', { orderID, userId });
      const data = response.data;

      if (data.message === 'success') {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Payment Successful',
          text2: 'Your subscription is now active.',
        });
        // router.push('/(home)/(budget)/payment-success');
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Payment Error',
          text2: 'Payment was not completed.',
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to capture payment.',
      });
    }
  };

  const onPaymentCancel = () => {
    setModalVisible(false);
    Toast.show({
      type: 'info',
      text1: 'Payment Cancelled',
      text2: 'You cancelled the payment process.',
    });
  };
  let trialMessage: string;  

  const subscriptionDate = userSubscription ? new Date(userSubscription) : null;  
  const trialEndDate = subscriptionDate ? new Date(subscriptionDate.setFullYear(subscriptionDate.getFullYear() + 1)).toLocaleDateString() : null;  
  
  if (userSubscription === null && userFullAccess) {  
    trialMessage = "You have 7 days of free trial.";  
  } else if (userSubscription === null || !userFullAccess) {  
    trialMessage = "Your 7-days free trial has ended.";  
  } else if (userSubscription && userFullAccess) {  
    trialMessage = `Your trial ends on ${trialEndDate}.`;  
  } else {  
    trialMessage = "Your trial status is unknown."; 
  }
  return (
    <MainBackground title=''>
      <View style={tw`w-full h-full flex flex-1`}>
        <NavigationHeader title='' />
        <MainNavigationBar />
        <ScrollView contentContainerStyle={tw`flex-grow`} style={tw`w-full h-full`}>
          <View style={tw`w-full h-full flex-1 flex items-center justify-center  pb-[120px]`}>
            <View style={tw`w-[300px] h-[370px]`}>
              <Image source={require('@/assets/images/budgetback.png')} style={tw`absolute w-full h-full`} />
              <View style={tw`px-[7px] py-[22px] w-full h-full flex flex-col justify-between`}>
                <View style={tw`w-full`}>
                  <ThemedText
                    variant='title22'
                    fontFamily='RaleWaySemiBold'
                    textcolor='#FFFFFF'
                    style={tw`text-center`}
                  >
                    Unlock Full Access for just $19.99/Year
                  </ThemedText>
                </View>
                <View style={tw`gap-[10px]`}>
                  <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>
                    • To upload unlimited legal document
                  </ThemedText>
                  <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>
                    • To add second set of checklist items
                  </ThemedText>
                  <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>
                    • Store unlimited document
                  </ThemedText>
                  <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>
                    • Access complete planning tools
                  </ThemedText>
                  <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>
                    • Securely share plans with executors
                  </ThemedText>
                </View>
                <View style={tw`flex w-full flex-col gap-[10px] justify-center items-center`}>
                  <NormalButton width={209} height={44} text='Subscribe Now' onPress={handleSubscribe} status={userSubscription == null ? false : true} />
                  <ThemedText textcolor='#BAC1C4' variant='title12' fontFamily='RaleWaySemiBold'>
                    {trialMessage}
                  </ThemedText>
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
      </View>
      <PaymentModal
        visible={modalVisible}
        approvalUrl={approvalUrl}
        onSuccess={onPaymentSuccess}
        onCancel={onPaymentCancel}
      />
    </MainBackground>
  );
}
