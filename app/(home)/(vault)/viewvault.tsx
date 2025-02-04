import React, { useState } from 'react';
import {
    View,
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import CheckListNavigation from '@/components/navigation/CheckListNavigation';
import CheckListUploadModal from '@/components/modal/CheckListUploadModal';
import UploadingModal from '@/components/modal/UpLoadingModal';
import SuccessModal from '@/components/modal/SuccessModal';
import ManIcon from '@/components/icons/ManIcon';
import NavigationHeader from '@/components/navigation/NavigationHeader';
export default function ViewVault() {
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);

    const openUploadModal = () => setUploadModalVisible(true);
    const closeUploadModal = () => setUploadModalVisible(false);
    const closeStatusModal = () => {
        setStatusModalVisible(false);
    }

    const handleFileUpload = () => {
        closeUploadModal();
        setUploadingModalVisible(true);

        let progress = 0;
        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                setUploadingModalVisible(false);
                setStatusModalVisible(true)
                setUploadProgress(0);
            } else {
                progress += 10;
                setUploadProgress(progress);
            }
        }, 500);
    };

    const handleCreateChecklist = () => {
        router.push('/(home)/(checklist)/createchecklist')
    };
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1`}>
                <NavigationHeader
                    title='View Vault'
                />
                <MainNavigationBar />
                <View
                    style={tw`pt-[46px] flex flex px-[30px] w-full gap-[34px]`}
                >
                    <View
                        style={tw`gap-[18px] flex flex-col`}
                    >
                        <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Title:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>Burial1</ThemedText>
                        </View>
                        <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Description:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>1.Buy Flower</ThemedText>
                        </View>
                        {/* <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Next of Kin:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>Alex John</ThemedText>
                        </View>
                        <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Location:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>Karnail Singh Stadium</ThemedText>
                        </View>
                        <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Funeral Type:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>Traditional</ThemedText>
                        </View>
                        <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Contact:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>+1 0211420420</ThemedText>
                        </View>
                        <View
                            style={tw`flex flex-row gap-[6.5px]`}
                        >
                            <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Budget:</ThemedText>
                            <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>$4000</ThemedText>
                        </View> */}

                    </View>
                    <View style={tw`w-full justify-center items-center`}>
                        <ManIcon />
                        <ThemedText variant='title14' textcolor='#C2C2C2' fontFamily='PoppinsMedium'>Attached File</ThemedText>
                    </View>
                </View>
            </View>

            <CheckListUploadModal
                visible={isUploadModalVisible}
                onClose={closeUploadModal}
                onCreateChecklist={handleCreateChecklist}
                onUpload={handleFileUpload}
                isLoading={false}
            />
            <UploadingModal
                visible={isUploadingModalVisible}
                progress={uploadProgress}
            />
            <SuccessModal
                visible={isStatusModalVisible}
                onCancel={closeStatusModal}
                onConfirm={closeStatusModal}
                statusText='Completed!'
                btnText='Check File'
            />
        </MainBackground>
    );
}
