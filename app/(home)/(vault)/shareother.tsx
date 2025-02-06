import React, { useEffect, useState } from 'react';
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
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/context/api';
import Toast from 'react-native-toast-message';
interface VaultItem {
    id: string,
    title: string,
    desc: string,
    filePath: string,
    fileType: string,
    sharedTo: any,
    userId:string
    created: number

}
export default function Index() {
    const { userId } = useAuth()
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [showNeedMembershipModal, setShowNeedMembershipModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [openOptionId, setOpenOptionId] = useState<string | number | null>(null);

    const [dataList, setDataList] = useState<VaultItem[]>([]);
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
    const handleDelete = (index: number) => {
        setSelectedIndex(index);
        setShowDeleteConfirmModal(!showDeleteConfirmModal)
    }
    const confirmDelete = async () => {
        if (selectedIndex !== null) {
            const item = dataList[selectedIndex];
            const data = {
                id: item.id
            }
            try {
                const response = await axiosInstance.post("/vault/delete", data);

                Toast.show({
                    type: "success",
                    text1: "Checklist Deleted",
                    text2: "Checklist deleted successfully",
                });
                fetchVault();
                setShowDeleteConfirmModal(!showDeleteConfirmModal)
            } catch (error) {
                console.error("Error updating checklist", error);
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Failed to update checklist.",
                });
            }
        }
    }
    const cancelDelete = () => {
        setShowDeleteConfirmModal(!showDeleteConfirmModal)
    }
    // const showVaultCreateOption = () => {
    //     setShowAddVaultOption(!showAddVaultOption)
    // };
    const showVaultCreateOption = () => {
        setShowNeedMembershipModal(!showNeedMembershipModal)
    }
    const toSubscription = () => {
        router.push('/(budget)/subscription')
    }
    const toCreatePage = () => {
        router.push('/(home)/(vault)/createvault')
    }
    const fetchVault = async () => {
        const data = {
            userId: userId
        }
        try {
            const response = await axiosInstance.post("/vault/getAllByUser", data)
            setDataList(response.data.data.sharedByOthers)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchVault()
    }, [])
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1 `}>
                <NavigationHeader title="Vault" />
                <MainNavigationBar />

                <View
                    style={tw`flex flex-row w-full gap-[15px] pt-[10px] pb-[12px] justify-around px-[25px]`}
                >
                    <TouchableOpacity
                        onPress={() => router.push("/(vault)")}
                        style={tw`p-[5px] justify-center items-center`}
                    >
                        <ThemedText variant='title14' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            My Vault
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/(vault)/shareme')}
                        style={tw`p-[5px] justify-center items-center`}
                    >
                        <ThemedText variant='title14' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            Shared by me
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/(vault)/shareother')}
                        style={tw`border-b-2 border-[#004CFF] p-[5px] justify-center items-center`}
                    >
                        <ThemedText variant='title14' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            Shared by others
                        </ThemedText>
                    </TouchableOpacity>



                </View>
                <View
                    style={tw`flex flex-col gap-[8px] pb-[24px] px-[25px]`}
                >
                    <ThemedText variant='title18' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                        Documents Vault
                    </ThemedText>
                    <ThemedText variant='title14' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>
                        Securely store and access your important documents anytime
                    </ThemedText>
                </View>

                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full `}
                >
                    <View
                        style={tw`w-full h-full flex items-center gap-[8px] pb-[120px] px-[25px]`}
                    >
                        {dataList.map((data, index) => (
                            <VaultCard key={index} data={data} onDelete={() => handleDelete(dataList.indexOf(data))} onRefresh={fetchVault} openOptionId={openOptionId} setOpenOptionId={setOpenOptionId} />
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
                                <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={() => { openUploadModal(), showVaultCreateOption() }}>
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
