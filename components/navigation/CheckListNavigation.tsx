import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import tw from "twrnc";
import LeftIcon from '../icons/LeftIcon';
import { ThemedText } from '../ThemedText';
import Notification from '../icons/Notification';
import OptionIcon from '../icons/OptionIcon';
import { Image } from 'react-native';
import ConfirmationModal from '../modal/ConfirmationModal';
import { router } from 'expo-router';
import UploadIcon from '../icons/UploadIcon';

interface CheckListNavigationProps {
    openModal: () => void;
    title : string; 
}
const CheckListNavigation: React.FC<CheckListNavigationProps> = ({ openModal,title }) => {
    const [showOption, setShowOption] = useState(false);

    const showItem = () => {
        setShowOption(!showOption);
    };
    return (
        <>
            {/* <ConfirmationModal
                visible={isModalVisible}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
                title="Log Out"
                message="Are you sure you want to log out?"
            /> */}
            <View
                style={[
                    tw`mt-[44px] w-full flex justify-center items-center px-[14px] h-[38px]`,
                    { position: 'relative', zIndex: 10 } // Set position to relative
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
                            {/* <TouchableOpacity
                                style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                            >
                                <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />
                                <Notification />
                                <View
                                    style={tw`w-[9px] h-[9px] rounded-[50px] bg-[#004CFF] absolute top-[4px] right-[6px]`}
                                />
                            </TouchableOpacity> */}
                            <TouchableOpacity
                                onPress={showItem}
                                style={tw`w-[30px] h-[30px] rounded-[56px] border border-[#004CFF] flex justify-center items-center`}
                            >
                                <View style={tw`absolute w-full h-full rounded-[50px] bg-[#004CFF] opacity-20`} />

                                <UploadIcon />
                            </TouchableOpacity>
                        </View>
                        {showOption &&
                            <View
                                style={[
                                    tw`absolute bottom-[-40px] right-[15px] gap-[3px] flex justify-end items-end`,
                                    { zIndex: 50, position: 'absolute' }
                                ]}
                            >
                                <Image source={require("@/assets/images/Polygon 2.png")} />
                                <TouchableOpacity
                                    onPress={() => {
                                        openModal();
                                        showItem();
                                    }}
                                    style={tw`w-[113px] h-[26px]`}
                                >
                                    <Image source={require('@/assets/images/logoutbtnback.png')} style={tw`absolute w-full h-full`} />
                                    <View
                                        style={tw`px-[8px] w-full h-full flex justify-center`}
                                    >
                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                            Upload Checklist
                                        </ThemedText>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>

            </View>
        </>

    );
};

export default CheckListNavigation;
