import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import OptionIcon from '@/components/icons/OptionIcon';
import VaultCardIcon from '@/components/icons/VaultCardIcon';

// Define the type for each item in the data list
interface VaultCardProps {
  item: {
    id: number;
    title: string;
    uploadDate: string;
  };
  onDelete: (id: number) => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ item, onDelete }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleOptionToggle = () => {
    setShowOptions(!showOptions);
  };

  return (
    <View style={tw`w-[332px] h-[73.62px] items-center`}>
      <Image source={require('@/assets/images/Frame 1000005982 (1).png')} style={tw`w-full absolute`} />
      <View style={tw`w-full h-full justify-between items-center flex flex-row px-[8px]`}>
        <View style={tw`flex flex-row gap-[10px] items-center`}>
          <VaultCardIcon />
          <View style={tw`flex flex-col gap-[7px]`}>
            <ThemedText variant="title16" textcolor="#FFFFFF" fontFamily="RaleWayBold">{item.title}</ThemedText>
            <ThemedText variant="title14" textcolor="#BAC1C4" fontFamily="RaleWaySemiBold">{`Upload Date: ${item.uploadDate}`}</ThemedText>
          </View>
        </View>
        <TouchableOpacity onPress={handleOptionToggle}>
          <OptionIcon />
        </TouchableOpacity>
        {showOptions && (
          <View style={tw`absolute bottom-[-91px] right-[12px] gap-[3px] flex justify-end items-end z-1`}>
            <Image source={require('@/assets/images/Polygon 2.png')} />
            <View style={tw`w-[111px] h-[104px] border border-[#004CFF] rounded-[4px] justify-between`}>
                <Image source={require("@/assets/images/checklistoptionback.png")} style={tw`w-full h-full absolute`} />
              <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                  View
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                  Share
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                  Download
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={() => {onDelete(item.id),handleOptionToggle()}}>
                <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                  Delete
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default VaultCard;
