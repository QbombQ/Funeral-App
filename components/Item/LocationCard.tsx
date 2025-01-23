import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '@/components/ThemedText'; 
import LocationsIcon from '@/components/icons/LocationsIcon';
import PhoneNumberIcon from '@/components/icons/PhoneNumberIcon'; 

type LocationCardProps = {
  name: string;
  location: string;
  phone: string;
  onCallPress?: () => void;
  onDirectionPress?: () => void;
};

const LocationCard: React.FC<LocationCardProps> = ({
  name,
  location,
  phone,
  onCallPress,
  onDirectionPress,
}) => {
  return (
    <View style={tw`w-[327px] h-[128px] py-[15px] px-[6px] gap-[12px]`}>
      <Image source={require('@/assets/images/locationcardItem.png')} style={tw`absolute`} />
      <View style={tw`flex flex-row gap-[12px]`}>
        <Image source={require('@/assets/images/Ellipse 4.png')} />
        <View style={tw`gap-[8px]`}>
          <ThemedText variant="title14" fontFamily="RaleWayBold" textcolor="#FFFFFF">
            {name}
          </ThemedText>
          <View style={tw`flex flex-row gap-[6px] items-center`}>
            <LocationsIcon />
            <ThemedText variant="title12" textcolor="#BAC1C4" fontFamily="RaleWaySemiBold">
              {location}
            </ThemedText>
          </View>
          <View style={tw`flex flex-row gap-[6px] items-center`}>
            <PhoneNumberIcon />
            <ThemedText variant="title12" textcolor="#BAC1C4" fontFamily="RaleWaySemiBold">
              {phone}
            </ThemedText>
          </View>
        </View>
      </View>
      <View style={tw`w-full flex flex-row justify-around items-center`}>
        <TouchableOpacity
          onPress={onCallPress}
          style={tw`w-[83px] h-[28px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px] gap-[6px]`}
        >
          <Image
            source={require('@/assets/images/ModalBack2.png')}
            style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
          />
          <PhoneNumberIcon />
          <ThemedText variant="title12" textcolor="#F6FBFD" style={{ fontFamily: 'NunitoMedium' }}>
            Call
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDirectionPress}
          style={tw`w-[115px] h-[28px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px] gap-[6px]`}
        >
          <Image
            source={require('@/assets/images/ModalBack1.png')}
            style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
          />
          <LocationsIcon />
          <ThemedText variant="title12" textcolor="#F6FBFD" style={{ fontFamily: 'NunitoMedium' }}>
            Get Direction
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationCard;
