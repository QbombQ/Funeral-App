import React, { useEffect, useState } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import DashBoardCardComponent from '@/components/ui/DashBoardCardComponent';
import { router } from 'expo-router';
import { useNavigationContext } from '@/context/NavigationContext';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/context/api';
import { connectSocket, getSocket } from '@/context/socket';
export default function Home() {
    const { userId } = useAuth()
    const { selectedTab, setSelectedTab } = useNavigationContext();
    const [userAccessInfor, setUserAccessInfor] = useState(false);

    const handleTabSelect = (tab: string) => {
        setSelectedTab(tab);
    };
    const openChecklist = () => {
        router.push('/(home)/(checklist)')
        // connectSocket(userId?.toString() || '');

        handleTabSelect('checklist');
    };

    const viewVault = () => {
        handleTabSelect('vault');
        router.push('/(home)/(vault)')
    };

    const trackBudget = () => {
        handleTabSelect("budget");
        router.push("/(home)/(budget)")
    };

    const exploreMap = () => {
        handleTabSelect("location")
        router.push("/(home)/(location)")
    };
    const upgradeMembership = () =>{
        handleTabSelect("subscription")
        router.push('/(home)/(budget)/subscription')
        
    }
    const fetchUserData = async () => {
        const data = {
            userId: userId
        }
        try {

            const response = await axiosInstance.post('/getUserData', data)
            setUserAccessInfor(response.data.data.isFullAccess)
        } catch (error) {
            console.log('fetch userdata:', error)
        }

    }
    useEffect(() => {
        fetchUserData()
    }, [userId])
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex`}>
                <NavigationHeader title='Welcome' />
                <MainNavigationBar />
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full`}
                >
                    <View
                        style={tw`pt-[20px] gap-[26px] flex flex-col justify-center w-full pb-[120px]`}
                    >
                        <View style={tw`px-[14px]`}>
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

                                extraText={userAccessInfor == true ? "Funeral Checklist with no Limit" : undefined}
                            />
                            <DashBoardCardComponent
                                title="Document Vault"
                                description="Store important documents like your will"
                                buttonText="View Vault"
                                buttonAction={viewVault}
                                extraText={userAccessInfor == true ? "Document Vault with Unlimited Storage" : undefined}
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
                                extraText={userAccessInfor == true ? "Budget Tracker with detailed breakdown" : undefined}
                            />
                            <DashBoardCardComponent
                                title="Subscription"
                                description="Upgrade membership for full access"
                                buttonText="Subscribe Now"
                                buttonAction={upgradeMembership}
                                extraText={userAccessInfor == true ? "You already have full access" : undefined}
                            />


                        </View>
                    </View>

                </ScrollView>
            </View>
        </MainBackground>
    );
}
