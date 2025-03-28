import React, { useState } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import tw from "twrnc";
import LeftIcon from '../icons/LeftIcon';
import { ThemedText } from '../ThemedText';
import Notification from '../icons/Notification';
import OptionIcon from '../icons/OptionIcon';
import { Image } from 'react-native';
import ConfirmationModal from '../modal/ConfirmationModal';
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
interface NavigationHeaderProps {
    title: string;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ title }) => {
    const { logout } = useAuth();

    const [showLogoutOption, setShowLogoutOption] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showLogoutItem = () => {
        setShowLogoutOption(!showLogoutOption);
    };

    const showLogOutModal = () => {
        setIsModalVisible(true);
    };

    const confirmLogout = () => {
        router.push('/(auth)')
        setIsModalVisible(false);
    };
    const showNotification = () => {
        router.push("/(home)/(notification)")
    }
    const cancelLogout = () => {
        setIsModalVisible(false);
    };
    const goBack = () => {
        router.back();
    }
    return (
        <>
            <ConfirmationModal
                visible={isModalVisible}
                onConfirm={logout}
                onCancel={cancelLogout}
                title="Log Out"
                message="Are you sure you want to log out?"
            />
            <View
                style={[
                    tw`${Platform.OS === 'ios' ? 'mt-0' : 'mt-[44px]'} w-full flex justify-center items-center px-[14px] h-[38px]`,
                    { position: 'relative', zIndex: 1 } 
                ]}
            >
            <View
                style={tw`w-full h-[38px] rounded-[100px] flex flex-row justify-between items-center`}
            >
                <View style={tw`bg-[#FFFFFF] opacity-5 w-full h-full rounded-[50px] absolute`} />
                <View
                    style={tw`w-full h-[38px] rounded-[100px] py-[4px] px-[12px] flex flex-row justify-between items-center`}
                >

                    <TouchableOpacity
                        style={tw`w-[30px] h-[30px] rounded-[50px] flex justify-center items-center`}
                        onPress={goBack}
                    >
                        <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-40`} />
                        <LeftIcon />
                    </TouchableOpacity>
                    <View>
                        <ThemedText variant='title12' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold' >
                            {title}
                        </ThemedText>
                    </View>
                    <View
                        style={tw`flex flex-row gap-[8px]`}
                    >
                        <TouchableOpacity
                            style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                            onPress={showNotification}
                        >
                            <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />
                            <Notification />
                            <View
                                style={tw`w-[9px] h-[9px] rounded-[50px] bg-[#004CFF] absolute top-[4px] right-[6px]`}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={showLogoutItem}
                            style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                        >
                            <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />

                            <OptionIcon />
                        </TouchableOpacity>
                    </View>
                    {showLogoutOption &&
                        <View
                            style={[
                                tw`absolute bottom-[-40px] right-[15px] gap-[3px] flex justify-end items-end`,
                                { zIndex: 50, position: 'absolute' }
                            ]}
                        >
                            <Image source={require("@/assets/images/Polygon 2.png")} />
                            <TouchableOpacity
                                onPress={() => {
                                    showLogOutModal();
                                    showLogoutItem();
                                }}
                                style={tw`w-[111px] h-[26px]`}
                            >
                                <Image source={require('@/assets/images/logoutbtnback.png')} style={tw`absolute w-full h-full`} />
                                <View
                                    style={tw`px-[8px] w-full h-full flex justify-center`}
                                >
                                    <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                        Log Out
                                    </ThemedText>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>

        </View >
        </>

    );
};

export default NavigationHeader;
