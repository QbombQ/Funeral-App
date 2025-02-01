import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import UploadingModal from '@/components/modal/UpLoadingModal';
import SuccessModal from '@/components/modal/SuccessModal';
import VaultCard from '@/components/Item/VaultCardItem';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import VaultUploadModal from '@/components/modal/VaultUploadModal';
import NeedMembershipModal from '@/components/modal/NeedMembershipModal';
import { router } from 'expo-router';
const dataList = [
    {
        id: 1,
        title: 'Last will and testament',
        uploadDate: "03-01-2025"
    },
    {
        id: 2,
        title: 'Last will and testament',
        uploadDate: "03-01-2025"
    },
    {
        id: 3,
        title: 'Last will and testament',
        uploadDate: "03-01-2025"
    },
    // {
    //     id: 4,
    //     title: 'Last will and testament',
    //     uploadDate: "03-01-2025"
    // },
    // {
    //     id: 5,
    //     title: 'Last will and testament',
    //     uploadDate: "03-01-2025"
    // }, {
    //     id: 6,
    //     title: 'Last will and testament',
    //     uploadDate: "03-01-2025"
    // },
    // {
    //     id: 7,
    //     title: 'Last will and testament',
    //     uploadDate: "03-01-2025"
    // }, {
    //     id: 8,
    //     title: 'Last will and testament',
    //     uploadDate: "03-01-2025"
    // },
    // {
    //     id: 9,
    //     title: 'Last will and testament',
    //     uploadDate: "03-01-2025"
    // },

];
export default function Index() {
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [showNeedMembershipModal, setShowNeedMembershipModal] = useState(false);

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



    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
    const [showAddVaultOption, setShowAddVaultOption] = useState(false)
    const handleDelete = () => {
        setShowDeleteConfirmModal(!showDeleteConfirmModal)
    }
    const confirmDelete = () => {
        setShowDeleteConfirmModal(!showDeleteConfirmModal)
    }
    const cancelDelete = () => {
        setShowDeleteConfirmModal(!showDeleteConfirmModal)
    }
    // const showVaultCreateOption = () => {
    //     setShowAddVaultOption(!showAddVaultOption)
    // };
    const showVaultCreateOption  = () =>{
        setShowNeedMembershipModal(!showNeedMembershipModal)
    }
    const toSubscription = () =>{
        router.push('/(budget)/subscription')
    }
    const toCreatePage = () =>{
        router.push('/(home)/(vault)/createvault')
    }
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1 `}>
                <NavigationHeader title="Vault" />
                <MainNavigationBar />
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full px-[25px]`}
                >

                    <View
                        style={tw`flex flex-col gap-[8px] pt-[24px] pb-[24px]`}
                    >
                        <ThemedText variant='title18' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            Documents Vault
                        </ThemedText>
                        <ThemedText variant='title14' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>
                            Securely store and access your important documents anytime
                        </ThemedText>
                    </View>
                    <View
                        style={tw`w-full h-full flex items-center gap-[8px] pb-[120px]`}
                    >
                        {dataList.map(item => (
                            <VaultCard key={item.id} item={item} onDelete={handleDelete} />
                        ))}
                    </View>
                </ScrollView>
                <View style={[tw`w-[36px] h-[36px] flex justify-center items-center absolute bottom-[116px] right-[27px]`, { zIndex: 30 }]}>

                    <TouchableOpacity onPress={toCreatePage} >
                        <Image source={require("@/assets/images/09. More.png")} />
                    </TouchableOpacity>
                    {showAddVaultOption &&

                        <View style={tw`transition absolute top-[-95px] right-[12px] gap-[3px] flex justify-end items-end`}>
                            <View style={tw`w-[129px] border border-[#004CFF] rounded-[4px] justify-between`}>
                                <Image source={require("@/assets/images/checklistoptionback.png")} style={tw`w-full h-full absolute`} />
                                <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={()=>{openUploadModal(),showVaultCreateOption()}}>
                                    <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                                        Upload from device
                                    </ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                    <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                                        Scan a Document
                                    </ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                    <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                                        Add a Notes
                                    </ThemedText>
                                </TouchableOpacity>

                            </View>
                            <Image source={require('@/assets/images/Polygon 2.png')} style={[tw`transform rotate-180`, { transform: [{ rotate: '180deg' }] }]} />
                        </View>
                    }

                </View>
            </View>

            <VaultUploadModal
                visible={isUploadModalVisible}
                onClose={closeUploadModal}
                onCreateChecklist={showVaultCreateOption}
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
            <ConfirmationModal
                title='Did you want to delete this file?'
                message='Files deleted can&apos;t be recover'
                visible={showDeleteConfirmModal}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
            <NeedMembershipModal
            visible={showNeedMembershipModal}
            onConfirm={toSubscription}
            title='Please Upgrade Your Membership'
            onCancel={showVaultCreateOption}
            />
        </MainBackground>
    );
}
