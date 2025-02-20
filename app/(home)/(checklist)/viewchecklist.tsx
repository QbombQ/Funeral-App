import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    View,
} from 'react-native';
import { router, useGlobalSearchParams } from "expo-router";
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
import LoadingComponent from '@/components/modal/LoadingComponent';
import axiosInstance from '@/context/api';
import ChecklistLayout from './_layout';
export default function Index() {
    const params = useGlobalSearchParams();
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [checkListData, setCheckListData] = useState<any>(null);
    const { id, title, desc, created, completed, sharedTo } = params as {
        id: string;
        title: string;
        desc: string;
        created: string;
        completed: string;
        sharedTo: any;
    };
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
    const fetchCheckListData = async (checkListId: string) => {
        const data = { id }
        const response = await axiosInstance.post("/check-list/getDetail", { id: checkListId });
        console.log(response.data);
        if (!response.data || !response.data.data) {
            throw new Error("Vault data is null");
        }
        console.log(response.data.data);

        setCheckListData(response.data.data);


    }
    useEffect(() => {
        if (!checkListData) {
            fetchCheckListData(id);
            return;
        }
    }, [id]);
    const handleCreateChecklist = () => {
        router.push('/(home)/(checklist)/createchecklist')
    };
    // if (isLoading) {
    //     return <ActivityIndicator size="large" color="#004CFF" />;
    // }
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1`}>
                <NavigationHeader
                    title='View Checklist'
                />
                <MainNavigationBar />
                {
                    isLoading &&
                    <>
                        <View
                            style={tw`w-full flex-1 justify-center items-center absolute h-full bg-black bg-opacity-30`}
                        >

                            <ActivityIndicator size="large" color="#004CFF" />
                        </View>

                    </>
                }
                {
                    checkListData &&
                    <View
                        style={tw`pt-[46px] flex flex px-[15px] w-full gap-[34px]`}
                    >
                        <View
                            style={tw`gap-[18px] flex flex-col`}
                        >
                            <View style={tw`flex flex-row flex-wrap gap-[6.5px]`}>
                                <ThemedText
                                    variant="title20"
                                    textcolor="#BAC1C4"
                                    style={tw`opacity-60 flex-shrink-0`}
                                    fontFamily="RaleWaySemiBold"
                                >
                                    Title:
                                </ThemedText>
                                <ThemedText
                                    variant="title20"
                                    textcolor="#BAC1C4"
                                    style={tw`flex-1 flex-wrap`}
                                    fontFamily="RaleWaySemiBold"
                                >
                                    {checkListData.title}
                                </ThemedText>
                            </View>

                            <View style={tw`flex flex-row flex-wrap gap-[6.5px]`}>
                                <ThemedText
                                    variant="title20"
                                    textcolor="#BAC1C4"
                                    style={tw`opacity-60 flex-shrink-0`}
                                    fontFamily="RaleWaySemiBold"
                                >
                                    Description:
                                </ThemedText>
                                <ThemedText
                                    variant="title20"
                                    textcolor="#BAC1C4"
                                    style={tw`flex-1 flex-wrap`}
                                    fontFamily="RaleWaySemiBold"
                                >
                                    {checkListData.desc}
                                </ThemedText>
                            </View>

                            {checkListData.sharedTo.length != 0 && (
                                <View style={tw`flex flex-row flex-wrap gap-[6.5px]`}>
                                    <ThemedText
                                        variant="title20"
                                        textcolor="#BAC1C4"
                                        style={tw`opacity-60 flex-shrink-0`}
                                        fontFamily="RaleWaySemiBold"
                                    >
                                        SharedTo:
                                    </ThemedText>
                                    <ThemedText
                                        variant="title20"
                                        textcolor="#BAC1C4"
                                        style={tw`flex-1 flex-wrap`}
                                        fontFamily="RaleWaySemiBold"
                                    >
                                        {checkListData.sharedTo}
                                    </ThemedText>
                                </View>
                            )}

                        </View>
                    </View>

                }
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
