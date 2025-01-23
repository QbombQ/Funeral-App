import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import tw from "twrnc";
import LeftIcon from '../icons/LeftIcon';
import { ThemedText } from '../ThemedText';
import Notification from '../icons/Notification';
import OptionIcon from '../icons/OptionIcon';
import { Image } from 'react-native';
import ConfirmationModal from '../modal/ConfirmationModal';
import { router } from 'expo-router';
import SettingIcon from '../icons/SettingIcon';
import { Input } from '@rneui/base';

interface LocationHeaderProps {
    title?: string;
}

const LocationHeader: React.FC<LocationHeaderProps> = ({ title }) => {
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

    const cancelLogout = () => {
        setIsModalVisible(false);
    };
    return (
        <View
            style={tw`absolute w-full h-full`}
        >
            <ConfirmationModal
                visible={isModalVisible}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
                title="Log Out"
                message="Are you sure you want to log out?"
            />
            <View
                style={[
                    tw`mt-[44px] w-full flex justify-center items-center px-[14px]`,
                    { position: 'absolute', zIndex: 1 } 
                ]}
            >

                <View
                    style={tw`w-full h-[38px] rounded-[100px] flex flex-row justify-between items-center`}
                >
                    <Image source={require("@/assets/images/locationheaderback.png")} style={tw`absolute w-full h-full`} />
                    {/* <View style={tw`bg-[#FFFFFF] opacity-5 w-full h-full rounded-[50px] absolute`} /> */}
                    <View
                        style={tw`w-full h-[38px] rounded-[100px] py-[4px] px-[12px] flex flex-row justify-between items-center`}
                    >

                        <TouchableOpacity
                            style={tw`w-[30px] h-[30px] rounded-[50px] flex justify-center items-center`}
                        >
                            <View style={tw`absolute w-full h-full rounded-[50px] bg-[#FFFFFF] shadow`} />
                            <LeftIcon color='black' />
                        </TouchableOpacity>
                        <View>
                            <ThemedText variant='title12' textcolor='#1F1F1F' fontFamily='RaleWaySemiBold' >
                                Find Funeral Homes Near You
                            </ThemedText>
                        </View>
                        <View
                            style={tw`flex flex-row gap-[8px]`}
                        >
                            <TouchableOpacity
                                style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                            >
                                <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />
                                <Notification color='black' />
                                <View
                                    style={tw`w-[9px] h-[9px] rounded-[50px] bg-[#004CFF] absolute top-[4px] right-[6px]`}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={showLogoutItem}
                                style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                            >
                                <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />

                                <OptionIcon color='black' />
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

                <View
                    style={tw`px-[41px] w-full h-[40px] gap-[12px] flex flex-row justify-center items-center`}
                >
                    <View
                    style={tw`w-full`}
                    >
                        <TextInput
                        placeholder='Search by zip code or city'
                        placeholderTextColor={"#707070"}
                        style={tw` rounded-full border w-full border-[#004CFF] pl-[40px] pr-[10px] z-1`}
                        >

                        </TextInput>
                        <Image source={require("@/assets/images/13. search-02.png")}  style={tw`absolute top-[8px] left-[12px]`}/>
                        <Image source={require("@/assets/images/ModalBack2.png")} style={tw`absolute w-full h-full rounded-full`} />
                    </View>
                    <TouchableOpacity
                        // onPress={showLogoutItem}
                        style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                    >
                        <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />

                        <SettingIcon color='black' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

export default LocationHeader;
