import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import tw, { style } from 'twrnc';
import MainBackground from '@/components/background/MainBackground';
import { ThemedText } from '@/components/ThemedText';
import { ThemedCheckBox } from '@/components/input/ThemedCheckBox';
import RightIcon from '@/components/icons/RightIcon';
import LeftIcon from '@/components/icons/LeftIcon';
import { router } from 'expo-router';
export default function OnboardingScreen() {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [selectedOption, setSelectedOption] = useState<String>("");
  const toDashboard = () => {
    router.push('/(home)')
  }
  return (
    <MainBackground title=''>
      <View
        style={tw`flex flex-col flex-1 w-full h-full pt-[64px] pb-[70px]`}
      >
        <View
          style={tw`flex flex-row w-full justify-center gap-[23px]`}
        >
          <View style={tw`w-[90px] h-[7px] bg-[#004CFF] rounded-[12px]`} />
          <View style={tw`w-[90px] h-[7px] bg-[#4D535E] rounded-[12px]`} />
          <View style={tw`w-[90px] h-[7px] bg-[#4D535E] rounded-[12px]`} />
        </View>

        <View style={tw`w-full h-full flex justify-around items-center`}>
          <View style={tw`pt-[51px] w-[263px]`}>
            <ThemedText variant='title24' textcolor='#E9E9E9' style={[tw`text-center`, { fontFamily: "RalewayBold" }]}>
              Let&apos;s Customize Your Experience
            </ThemedText>
          </View>.


          <View style={tw`py-[16px] px-[12px] flex flex-col gap-[24px] relative`}>
            <Image source={require('@/assets/images/Frame 1000005921 (1).png')} style={tw`absolute top-0 left-0 z-[-3] h-[222px] w-[313px]`} />
            <ThemedText variant='title22' textcolor='#FFFFFF' style={[tw`w-[289px] text-center`, { fontFamily: 'NunitoBold' }]}>
              What is your primay goal?
            </ThemedText>
            <View style={tw`flex flex-col gap-[11px]`}>
              <View style={tw`flex flex-row items-center gap-[12px]`}>
                <ThemedCheckBox
                  checked={selectedOption === 'funeral'}
                  onPress={() => setSelectedOption('funeral')}
                  size={20}
                />
                <ThemedText
                  variant="title19"
                  textcolor="#95989A"
                  style={{ fontFamily: 'NunitoRegular' }}
                >
                  Funeral Planning
                </ThemedText>
              </View>

              <View style={tw`flex flex-row items-center gap-[12px]`}>
                <ThemedCheckBox
                  checked={selectedOption === 'legal'}
                  onPress={() => setSelectedOption('legal')}
                  size={20}
                />
                <ThemedText
                  variant="title19"
                  textcolor="#95989A"
                  style={{ fontFamily: 'NunitoRegular' }}
                >
                  Legal Documents
                </ThemedText>
              </View>

              <View style={tw`flex flex-row items-center gap-[12px]`}>
                <ThemedCheckBox
                  checked={selectedOption === 'budget'}
                  onPress={() => setSelectedOption('budget')}
                  size={20}
                />
                <ThemedText
                  variant="title19"
                  textcolor="#95989A"
                  style={{ fontFamily: 'NunitoRegular' }}
                >
                  Budgeting
                </ThemedText>
              </View>

              <View style={tw`flex flex-row items-center gap-[12px]`}>
                <ThemedCheckBox
                  checked={selectedOption === 'all'}
                  onPress={() => setSelectedOption('all')}
                  size={20}
                />
                <ThemedText
                  variant="title19"
                  textcolor="#95989A"
                  style={{ fontFamily: 'NunitoRegular' }}
                >
                  All of the above
                </ThemedText>
              </View>

            </View>
          </View>
          <View style={tw`flex flex-row w-full justify-between px-[28px]`}>
            <TouchableOpacity
              disabled
              style={tw`w-[30px] h-[30px] flex justify-center items-center rounded-[50px] bg-[#383A3B]`}
            >
              <LeftIcon />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toDashboard}
              style={tw`w-[30px] h-[30px] flex justify-center items-center rounded-[50px] bg-[#004CFF]`}
            >
              <RightIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainBackground>
  );
}
