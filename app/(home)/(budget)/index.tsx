import React from 'react';
import {
    View,
    Image,
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import { NormalButton } from '@/components/button/NormalButton';


export default function Index() {
    const toPayment = () => {
        router.push('/(home)/(budget)/payment')
    }
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1 `}>
                <NavigationHeader title="" />
                <MainNavigationBar />
                <View
                    style={tw`w-full h-full flex-1 flex items-center pt-[30%]`}
                >
                    <View
                        style={tw`w-[300px] h-[370px]`}
                    >
                        <Image source={require("@/assets/images/budgetback.png")} style={tw`absolute w-full h-full`} />
                        <View
                            style={tw`px-[7px] py-[22px] w-full h-full flex flex-col justify-between`}
                        >
                            <View
                                style={tw`w-full `}
                            >
                                <ThemedText variant='title22' fontFamily='RaleWaySemiBold' textcolor='#FFFFFF' style={tw`text-center`} >Unlock Full Access for just $19.99/Month</ThemedText>
                            </View>

                            <View
                                style={tw`gap-[10px]`}
                            >
                                <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>• To upload unlimited legal document</ThemedText>
                                <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>• To add second set of checklist items</ThemedText>
                                <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>• Store unlimited document</ThemedText>
                                <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>• Access complete planning tools</ThemedText>
                                <ThemedText textcolor='#BAC1C4' variant='title14' fontFamily='RaleWaySemiBold'>• Securely share plans with executors</ThemedText>
                            </View>
                            <View
                                style={tw`flex w-full flex-col gap-[10px] justify-center items-center`}
                            >
                                <NormalButton width={209} height={44} text='Subscribe Now' onPress={toPayment} />
                                <ThemedText textcolor='#BAC1C4' variant='title12' fontFamily='RaleWaySemiBold'>Your 7-days free trial has ended</ThemedText>

                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </MainBackground>
    );
}
