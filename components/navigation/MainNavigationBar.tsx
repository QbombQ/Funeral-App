import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import LeftIcon from '../icons/LeftIcon';
import { ThemedText } from '../ThemedText';
import Notification from '../icons/Notification';
import OptionIcon from '../icons/OptionIcon';
import { Image } from 'react-native';
import ConfirmationModal from '../modal/ConfirmationModal';
import HomeIcon from '../icons/HomeIcon';
import CheckListIcon from '../icons/CheckListIcon';
import VaultIcon from '../icons/VaultIcon';
import BudgetIcon from '../icons/BudgetIcon';
import LocationIcon from '../icons/LocationIcon';
import { router } from 'expo-router';
import { useNavigationState, useRoute } from '@react-navigation/native';
import { useNavigationContext } from '@/context/NavigationContext';

const MainNavigationBar: React.FC = () => {
  const { selectedTab, setSelectedTab } = useNavigationContext();


  const handleTabSelect = (tab: string) => {
    setSelectedTab(tab);
  };
  const toCheckList = () => {
    handleTabSelect('checklist');
    router.push('/(home)/(checklist)');
  };

  const toHome = () => {
    handleTabSelect('home');
    router.push('/(home)/home');
  };
  const toVault = () => {
    handleTabSelect('vault');
    router.push('/(home)/(vault)');
  }
  const toBudget = () =>{
    handleTabSelect("budget");
    router.push('/(home)/(budget)')
  }
  const toLocation = () =>{
    handleTabSelect("location")
    router.push('/(home)/(location)')
  }
  return (
    <View style={[tw`w-full absolute bottom-[30px] px-[8px] justify-center`, { position: "absolute", zIndex: 2 }]}>
      {/* <View style={tw`w-full h-[80px] rounded-[50px] border border-[#004CFF] bg-[#004CFF] bg-opacity-20`}> */}
      <View style={tw`w-full h-[80px] rounded-[50px] border border-[#004CFF] bg-[#0C1A36]`}>
        <Image source={require('@/assets/images/Navbar (3).png')} style={tw`absolute w-full h-full`} />
        <View style={tw`w-full h-full px-[24px] py-[11px] flex flex-row justify-between`}>
          <TouchableOpacity
            style={tw`flex flex-col justify-center items-center px-[5px]`}
            onPress={() => { handleTabSelect('home'), toHome() }}
          >
            <View style={tw`w-[40px] h-[40px] flex justify-center items-center rounded-[50px] ${selectedTab === 'home' ? 'bg-[#004CFF] bg-opacity-20 border border-[#004CFF]' : ''}`}>
              <HomeIcon color={selectedTab === 'home' ? '#004CFF' : undefined} />
            </View>
            <ThemedText variant='title14' textcolor={selectedTab === 'home' ? '#004CFF' : '#BAC1C4'} fontFamily='NunitoRegular'>
              Home
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex flex-col justify-center items-center px-[5px]`}
            onPress={() => { handleTabSelect('checklist'), toCheckList() }}
          >
            <View style={tw`w-[40px] h-[40px] flex justify-center items-center rounded-[50px] ${selectedTab === 'checklist' ? 'bg-[#004CFF] bg-opacity-20 border border-[#004CFF]' : ''}`}>
              <CheckListIcon color={selectedTab === 'checklist' ? '#004CFF' : undefined} />
            </View>
            <ThemedText variant='title14' textcolor={selectedTab === 'checklist' ? '#004CFF' : '#BAC1C4'} fontFamily='NunitoRegular'>
              Checklist
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex flex-col justify-center items-center px-[5px]`}
            onPress={() => { handleTabSelect('vault'), toVault() }}
          >
            <View style={tw`w-[40px] h-[40px] flex justify-center items-center rounded-[50px] ${selectedTab === 'vault' ? 'bg-[#004CFF] bg-opacity-20 border border-[#004CFF]' : ''}`}>
              <VaultIcon color={selectedTab === 'vault' ? '#004CFF' : undefined} />
            </View>
            <ThemedText variant='title14' textcolor={selectedTab === 'vault' ? '#004CFF' : '#BAC1C4'} fontFamily='NunitoRegular'>
              Vault
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={tw`flex flex-col justify-center items-center px-[5px]`}
            onPress={() => { handleTabSelect('budget'), toBudget() }}
          >
            <View style={tw`w-[40px] h-[40px] flex justify-center items-center rounded-[50px] ${selectedTab === 'budget' ? 'bg-[#004CFF] bg-opacity-20 border border-[#004CFF]' : ''}`}>
              <BudgetIcon color={selectedTab === 'budget' ? '#004CFF' : undefined} />
            </View>
            <ThemedText variant='title14' textcolor={selectedTab === 'budget' ? '#004CFF' : '#BAC1C4'} fontFamily='NunitoRegular'>
              Budget
            </ThemedText>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={tw`flex flex-col justify-center items-center px-[5px]`}
            onPress={() => {handleTabSelect('location'),toLocation()}}
          >
            <View style={tw`w-[40px] h-[40px] flex justify-center items-center rounded-[50px] ${selectedTab === 'location' ? 'bg-[#004CFF] bg-opacity-20 border border-[#004CFF]' : ''}`}>
              <LocationIcon color={selectedTab === 'location' ? '#004CFF' : undefined} />
            </View>
            <ThemedText variant='title14' textcolor={selectedTab === 'location' ? '#004CFF' : '#BAC1C4'} fontFamily='NunitoRegular'>
              Location
            </ThemedText>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default MainNavigationBar;
