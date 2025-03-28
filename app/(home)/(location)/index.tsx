import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc"
import MainBackground from '@/components/background/MainBackground';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import LocationHeader from '@/components/navigation/LocationHeader';
import SettingIcon from '@/components/icons/SettingIcon';
import LocationCard from '@/components/Item/LocationCard';


export default function Index() {
    const [showServiceOption, setShowServiceOption] = useState(false)

    const toPayment = () => {
        router.push('/(home)/(budget)/payment')
    }
    const handleCallPress = () => {
        console.log('Calling...');
    };

    const handleDirectionPress = () => {
        console.log('Getting direction...');
    };
    const showServiceItem = () => {
        setShowServiceOption(!showServiceOption)
    }
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1 `}>
                <Image source={require("@/assets/images/Android Large - 2.png")} style={tw`w-full h-[540px] rounded-lg`} />
                <LocationHeader title="" />
                <MainNavigationBar />
                <View
                    style={tw`pt-[9px] w-full px-[23px] justify-end items-end pb-[15px]`}
                >
                    <TouchableOpacity
                        onPress={showServiceItem}
                        style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                    >
                        <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />

                        <SettingIcon color='#BAC1C4' />
                    </TouchableOpacity>
                    {showServiceOption && (
                        <View style={tw`absolute bottom-[-41px] right-[25px] gap-[3px] flex justify-end items-end z-1`}>
                            <View style={tw`w-[111px] border border-[#004CFF] rounded-[4px] justify-between`}>
                                <Image source={require("@/assets/images/checklistoptionback.png")} style={tw`w-full h-full absolute`} />
                                <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                    <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                                    Cremation
                                    </ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                    <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                                    Burial Services
                                    </ThemedText>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                </View>
                <ScrollView>

                    <View
                        style={tw`gap-[4px] flex flex-col items-center pb-[120px]`}
                    >
                        <LocationCard
                            name="Mattew John"
                            location="Karnail Singh Stadium"
                            phone="+1 0211420420"
                            onCallPress={handleCallPress}
                            onDirectionPress={handleDirectionPress}
                        />
                        <LocationCard
                            name="Mattew John"
                            location="Karnail Singh Stadium"
                            phone="+1 0211420420"
                            onCallPress={handleCallPress}
                            onDirectionPress={handleDirectionPress}
                        />
                        <LocationCard
                            name="Mattew John"
                            location="Karnail Singh Stadium"
                            phone="+1 0211420420"
                            onCallPress={handleCallPress}
                            onDirectionPress={handleDirectionPress}
                        />

                    </View>
                </ScrollView>
            </View>

        </MainBackground>
    );
}
