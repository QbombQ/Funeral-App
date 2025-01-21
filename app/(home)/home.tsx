import React, { useState } from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Switch
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import DashBoardCardComponent from '@/components/ui/DashBoardCardComponent';
export default function Home() {

    const openChecklist = () => {
        console.log("Opening Checklist...");
    };

    const viewVault = () => {
        console.log("Viewing Vault...");
    };

    const trackBudget = () => {
        console.log("Tracking Budget...");
    };

    const exploreMap = () => {
        console.log("Exploring Map...");
    };
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex`}>
                <NavigationHeader />
                <MainNavigationBar />
                <View
                    style={tw`pt-[20px] px-[14px] gap-[26px] flex flex-col justify-center`}
                >
                    <View>
                        <ThemedText variant='title24' textcolor='#FFFFFF' fontFamily='RalewayBold'>
                            Dashboard
                        </ThemedText>
                    </View>
                    <View
                        style={tw`flex flex-row w-full justify-around items-center`}
                    >
                        <DashBoardCardComponent
                            title="Funeral Checklist"
                            description="Start building your plan step-by-step"
                            buttonText="Open Checklist"
                            buttonAction={openChecklist}
                            extraText="Funeral Checklist with no Limit"
                        />
                        <DashBoardCardComponent
                            title="Document Vault"
                            description="Store important documents like your will"
                            buttonText="View Vault"
                            buttonAction={viewVault}
                            extraText="Document Vault with Unlimited Storage"
                        />


                    </View>
                    <View
                        style={tw`flex flex-row w-full justify-around items-center`}
                    >
                        <DashBoardCardComponent
                            title="Budget Track"
                            description="Plan your expenses and manage costs"
                            buttonText="Track Budget"
                            buttonAction={trackBudget}
                            extraText="Budget Tracker with detailed breakdown"
                        />
                        <DashBoardCardComponent
                            title="Funeral Home Locator"
                            description="Find funeral homes near you"
                            buttonText="Explore Map"
                            buttonAction={exploreMap}
                            extraText="Funeral Home Locator for ongoing access to map and providers"
                        />


                    </View>
                </View>
            </View>
        </MainBackground>
    );
}
