import React, { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import tw from "twrnc";

import MainBackground from '@/components/background/MainBackground';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import CheckListNavigation from '@/components/navigation/CheckListNavigation';

import CheckListCardItem from '@/components/Item/CheckListCardItem';

import CheckListUploadModal from '@/components/modal/CheckListUploadModal';
import UploadingModal from '@/components/modal/UpLoadingModal';
import SuccessModal from '@/components/modal/SuccessModal';
import CreateChecklistModal from '@/components/modal/CreateCheckListModal';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import { ThemedText } from '@/components/ThemedText';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import { router } from 'expo-router';
import axiosInstance from '@/context/api';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
interface ChecklistItem {
    title: string;
    desc: string;
    created: string;
    completed: boolean;
    id: any;
    sharedTo: any;
    userId:string;
}

type ConfirmationAction = 'remove' | 'complete' | null;

export default function Index() {
    const { userId } = useAuth()
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);

    const [dataList, setDataList] = useState<ChecklistItem[]>([]);

    const [confirmationAction, setConfirmationAction] = useState<ConfirmationAction>(null);
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [openOptionId, setOpenOptionId] = useState<string | number | null>(null);

    const [isCreateModalVisible, setCreateModalVisible] = useState(false);

    const openUploadModal = () => setUploadModalVisible(true);
    const closeUploadModal = () => setUploadModalVisible(false);

    const handleFileUpload = () => {
        closeUploadModal();
        setUploadingModalVisible(true);
        let progress = 0;
        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                setUploadingModalVisible(false);
                setStatusModalVisible(true);
                setUploadProgress(0);
            } else {
                progress += 10;
                setUploadProgress(progress);
            }
        }, 500);
    };

    const closeStatusModal = () => {
        setStatusModalVisible(false);
    };

    const openCreateModal = () => setCreateModalVisible(true);
    const closeCreateModal = () => setCreateModalVisible(false);
    const fetchChecklists = async () => {
        const data = { userId }
        try {
            const response = await axiosInstance.post("/check-list/getAllByUser", data);
            (response.data.data.sharedByOthers)
            setDataList(response.data.data.sharedByOthers);
        } catch (error) {
            console.error("Error fetching checklist:", error);
        }

    };
    useEffect(() => {
        fetchChecklists();
    }, []);
    const handleCreateChecklist = async (newItem: Omit<ChecklistItem, "completed">) => {
        try {
            const payload = { ...newItem };
            const data = { userId: userId, title: payload.title, desc: payload.desc }

            const response = await axiosInstance.post('/check-list/create', data);


            Toast.show({
                type: "success",
                text1: "Checklist Created",
                text2: "Your checklist has been added successfully.",
            });

            closeCreateModal();
            fetchChecklists();
        } catch (error) {
            console.log(error);

            Toast.show({
                type: "error",
                text1: "Failed to Create",
                text2: "There was an error creating the checklist.",
            });
        } finally {
            // setIsUploading(false);
        }
    };

    const showConfirmationModal = (index: number, action: ConfirmationAction) => {
        setSelectedIndex(index);
        setConfirmationAction(action);
        setConfirmationModalVisible(true);
    };

    const closeConfirmationModal = () => {
        setSelectedIndex(null);
        setConfirmationAction(null);
        setConfirmationModalVisible(false);
    };

    const handleConfirmAction = () => {
        if (confirmationAction === 'remove') {
            handleRemoveItem();
        } else if (confirmationAction === 'complete') {
            handleMarkItemCompleted();
        }
        closeConfirmationModal();
    };

    const handleRemoveItem = () => {
        if (selectedIndex !== null) {
            setDataList((prevData) => prevData.filter((_, idx) => idx !== selectedIndex));
        }
    };

    const handleMarkItemCompleted = () => {
        if (selectedIndex !== null) {
            setDataList(prevData =>
                prevData.map((item, i) =>
                    i === selectedIndex ? { ...item, completed: true } : item
                )
            );
        }
    };

    const handleCheckboxClick = (index: number) => {

        try {
            const data = {}
        } catch {

        }
        const item = dataList[index];
        if (!item.completed) {
            showConfirmationModal(index, 'complete');
        } else {
            setDataList(prevData =>
                prevData.map((itm, i) =>
                    i === index ? { ...itm, completed: false } : itm
                )
            );
        }
    };

    const handleItemDelete = (index: number) => {
        showConfirmationModal(index, 'remove');
    };

    const incompleteItems = dataList.filter(item => !item.completed);
    const completedItems = dataList.filter(item => item.completed);
    // const incompleteItems = <data value=""></data>
    // const completedItems = dataList

    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1`}>
                {/* <CheckListNavigation
                    openModal={openUploadModal}
                    title="Checklist"
                /> */}
                <NavigationHeader
                    title='Checklist'
                />
                <MainNavigationBar />
                <View
                    style={tw`flex flex-row w-full px-[31px] pt-[10px] pb-[12px] justify-between`}
                >
                    <TouchableOpacity
                        onPress={() => router.push("/(home)/(checklist)")}
                        style={tw`p-[5px] justify-center items-center`}
                    >
                        <ThemedText variant='title14' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            My Checklist
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/(home)/(checklist)/shareme')}
                        style={tw`p-[5px] justify-center items-center`}
                    >
                        <ThemedText variant='title14' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            Shared by me
                        </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('/(home)/(checklist)/shareother')}
                        style={tw`border-b-2 border-[#004CFF] p-[5px] justify-center items-center`}
                    >
                        <ThemedText variant='title14' textcolor='#FFFFFF' fontFamily='RaleWaySemiBold'>
                            Shared by others
                        </ThemedText>
                    </TouchableOpacity>



                </View>
                <ScrollView contentContainerStyle={tw`flex-grow`} style={tw`w-full h-full`}>
                    <View style={tw`w-full px-[31px] items-center gap-[8px] pb-[120px]`}>
                        {incompleteItems.map((data, index) => (
                            <CheckListCardItem
                                key={index}
                                data={data}
                                onCheck={() => handleCheckboxClick(dataList.indexOf(data))}
                                onRemove={() => handleItemDelete(dataList.indexOf(data))}
                                onRefresh={fetchChecklists}
                                openOptionId={openOptionId}
                                setOpenOptionId={setOpenOptionId}
                            />
                        ))}
                        {completedItems.length > 0 && (
                            <View style={tw`items-center gap-[10px]`}>
                                <View style={tw`mt-[10px] w-full px-[30px] gap-[10px] flex-row items-center`}>
                                    <View style={tw`bg-[#004CFF] h-[1px] w-[35%]`} />
                                    <ThemedText variant='title14' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>
                                        Completed
                                    </ThemedText>
                                    <View style={tw`bg-[#004CFF] h-[1px] w-[35%]`} />
                                </View>

                                {completedItems.map((data, index) => (
                                    <CheckListCardItem
                                        key={`completed-${index}`}
                                        data={data}
                                        onCheck={() => handleCheckboxClick(dataList.indexOf(data))}
                                        onRemove={() => handleItemDelete(dataList.indexOf(data))}
                                        onRefresh={fetchChecklists}
                                        openOptionId={openOptionId}
                                        setOpenOptionId={setOpenOptionId}
                                    />
                                ))}
                            </View>
                        )}
                    </View>

                </ScrollView>

                <View
                    style={[
                        tw`w-[36px] h-[36px] flex justify-center items-center absolute bottom-[116px] right-[27px]`,
                        { zIndex: 30 },
                    ]}
                >
                    <TouchableOpacity onPress={openCreateModal}>
                        <Image source={require("@/assets/images/09. More.png")} />
                    </TouchableOpacity>
                </View>
            </View>

            <CheckListUploadModal
                visible={isUploadModalVisible}
                onClose={closeUploadModal}
                onCreateChecklist={openCreateModal}
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
            <CreateChecklistModal
                visible={isCreateModalVisible}
                onClose={closeCreateModal}
                onCreate={handleCreateChecklist}
            />

            <ConfirmationModal
                visible={isConfirmationModalVisible}
                onConfirm={handleConfirmAction}
                onCancel={closeConfirmationModal}
                title={
                    confirmationAction === 'remove'
                        ? 'Confirm Removal'
                        : 'Confirm Checklist'
                }
                message={
                    confirmationAction === 'remove'
                        ? 'Are you sure you want to delete this checklist?'
                        : 'Are you sure you want to mark this checklist as completed?'
                }
            />
        </MainBackground>
    );
}
