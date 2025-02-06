import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { router, useGlobalSearchParams } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import CheckListNavigation from '@/components/navigation/CheckListNavigation';
import { ThemedText } from '@/components/ThemedText';
import PlusIcon from '@/components/icons/PlusIcon';
import MusicIcon from '@/components/icons/MusicIcon';
import PhotoIcon from '@/components/icons/PhotoIcon';
import GalleryIcon from '@/components/icons/GalleryIcon';
import VideoIcon from '@/components/icons/VideoIcon';
import NormalInput from '@/components/input/NormalInput';
import SwitchForm from '@/components/input/SwitchForm';
import UploadImageComponent from '@/components/modal/UploadImageModal';
import UploadingModal from "@/components/modal/UpLoadingModal"
import SuccessModal from '@/components/modal/SuccessModal';
import ManIcon from '@/components/icons/ManIcon';
import ConfirmationModal from '@/components/modal/ConfirmationModal';
import CheckListUploadModal from '@/components/modal/CheckListUploadModal';
import { BlueButton } from '@/components/button/BlueButton';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import axiosInstance from '@/context/api';
import Toast from 'react-native-toast-message';
import { useAuth } from '@/context/AuthContext';

export default function EditCheckList() {
    const { userId } = useAuth()
    const params = useGlobalSearchParams();
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [showItem, setShowItem] = useState(false)
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [isShowUploadedImage, setShowUploadedImage] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);

    const { id, title: initialTitle, desc: initialDesc, created, completed } = params as {
        id: string;
        title: string;
        desc: string;
        created: string;
        completed: string;
    };

    const [title, setTitle] = useState(initialTitle || '');
    const [desc, setDesc] = useState(initialDesc || '');

    const showOptionItem = () => {
        setShowItem(!showItem)
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    const openUploadModal = () => setUploadModalVisible(true);
    const closeConfirmationModal = () => {
        setShowConfirmationModal(false);

    }
    const closeStatusModal = () => {
        setStatusModalVisible(false);
        if (isUploadSuccessful) {
            setIsUploadSuccessful(false);
        } else {
            // router.push("/(home)/(checklist)/viewchecklist");
            router.push({
                pathname: "/(home)/(checklist)/viewchecklist",
                params: {
                    id: id,
                    title: title,
                    desc: desc,
                    created: created,
                    completed: completed ? "true" : "false",
                },
            });
        }
    }
    const handleFileUpload = () => {
        closeModal();
        setUploadingModalVisible(true);
        setModalVisible(false)
        let progress = 0;
        const interval = setInterval(() => {
            if (progress >= 100) {
                clearInterval(interval);
                setUploadingModalVisible(false);
                setShowUploadedImage(true);
                setStatusModalVisible(true)
                setUploadProgress(0);
                setIsUploadSuccessful(true)
            } else {
                progress += 10;
                setUploadProgress(progress);
            }
        }, 500);
    };
    const showEditChecklistModal = () => {
        setShowConfirmationModal(true)
    }
    const showSuccessfulModal = () => {
        setStatusModalVisible(true)
        setShowConfirmationModal(false)

    }
    const closeUploadModal = () => setUploadModalVisible(false);
    const handleCreateChecklist = () => {
        router.push('/(home)/(checklist)/createchecklist')
    };

    const editCheckilist = async () => {
        try {
            const data = {
                id,
                title,
                desc,
                userId: userId,
                completed
            };

            const response = await axiosInstance.post("/check-list/update", data);
            if (response.data.message == "success") {
                Toast.show({
                    type: "success",
                    text1: "Checklist Updated",
                    text2: "Your checklist has been updated successfully.",
                });
                setShowConfirmationModal(false);
                setStatusModalVisible(true);
                return;
                // router.push("/(checklist)/viewchecklist");
            }
        } catch (error) {
            console.error("Error updating checklist", error);
            Toast.show({
                type: "error",
                text1: "Update Failed",
                text2: "There was an error updating the checklist.",
            });
        }
    }

    return (
        <MainBackground title=''>
            <View style={tw`flex-1`}>
                <NavigationHeader
                    title='Edit Checklist'
                />
                <MainNavigationBar />
                <View
                    style={tw`mt-[10px] w-full h-full px-[23px] justify-between gap-[12px]`}
                >
                    <View
                        style={tw`gap-[12px] justify-center w-full`}
                    >
                        <View
                            style={tw`w-full flex flex-row justify-end gap-[5px] items-center`}
                        >
                            {/* <ThemedText variant='title12' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>
                                Create a New Title
                            </ThemedText>
                            <TouchableOpacity
                                onPress={showOptionItem}
                            >
                                <Image source={require('@/assets/images/09. More.png')} style={tw`w-[24px] h-[24px]`} />
                            </TouchableOpacity> */}

                            {/* {showItem && (
                                <View style={[tw`absolute bottom-[-185px] right-[6px] gap-[3px] flex justify-end items-end`, { zIndex: 4, position: 'absolute' }]}>
                                    <Image source={require('@/assets/images/Polygon 2.png')} />
                                    <View style={tw`w-[151px] h-[170px] border border-[#004CFF] rounded-[4px] justify-between`}>
                                        <Image source={require('@/assets/images/addback.png')} style={tw`absolute w-full h-full`} />
                                        <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex items-center flex flex-row gap-[10px]`}>
                                            <PlusIcon />
                                            <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                Add New title
                                            </ThemedText>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={tw`px-[8px] h-[26px] flex items-center flex flex-row gap-[10px]`}>
                                            <MusicIcon />
                                            <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                Music
                                            </ThemedText>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={tw`px-[8px] h-[26px] flex items-center flex flex-row gap-[10px]`}>
                                            <PhotoIcon />
                                            <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                Take Picture
                                            </ThemedText>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={tw`px-[8px] h-[26px] flex items-center flex flex-row gap-[10px]`} onPress={() => { setModalVisible(true), setShowItem(false) }}>
                                            <GalleryIcon />
                                            <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                Add from gallery
                                            </ThemedText>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={tw`px-[8px] h-[26px] flex items-center flex flex-row gap-[10px]`}>
                                            <VideoIcon />
                                            <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                Add Video
                                            </ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )} */}
                        </View>

                        <View
                            style={tw`w-full rounded-[12px] w-full bg-[#1D2C4F] bg-opacity-60 flex flex-col gap-[8px]`}
                        >
                            <View
                                style={tw`p-[12px] gap-[8px]`}
                            >
                                <View
                                    style={tw`w-full flex flex-row w-full`}
                                >
                                    <View
                                        style={tw`flex flex-col gap-[6px] w-full`}
                                    >
                                        <ThemedText variant='title12' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>
                                            Title:
                                        </ThemedText>
                                        <NormalInput
                                            placeholder="E.g Burial"
                                            value={title}
                                            onChangeText={setTitle}
                                        />
                                    </View>
                                    {/* <View
                                        style={tw`flex-1 justify-center items-center pt-[10px] gap-[5px]`}
                                    >
                                        <Image source={require('@/assets/images/09. More.png')} style={tw`w-[24px] h-[24px]`} />
                                        <ThemedText variant='title12' textcolor='#C2C2C2' fontFamily='PoppinsLight'>
                                            Create List
                                        </ThemedText>
                                    </View> */}
                                </View>
                                <View
                                    style={tw`w-full flex flex-row w-full`}
                                >
                                    <View
                                        style={tw`flex flex-col gap-[6px] w-full`}
                                    >
                                        <ThemedText variant='title12' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>
                                            Description:
                                        </ThemedText>
                                        <NormalInput
                                            placeholder="E.g Buy Flower"
                                            value={desc}
                                            onChangeText={setDesc}
                                        />
                                    </View>
                                    {/* <View
                                        style={tw`flex-1 justify-center items-center pt-[10px] gap-[5px]`}
                                    >
                                        <Image source={require('@/assets/images/09. More.png')} style={tw`w-[24px] h-[24px]`} />
                                        <ThemedText variant='title12' textcolor='#C2C2C2' fontFamily='PoppinsLight'>
                                            Add List
                                        </ThemedText>
                                    </View> */}
                                </View>

                            </View>


                        </View>
                        {isShowUploadedImage &&
                            <View style={tw`w-full justify-center items-center`}>
                                <ManIcon />
                                <ThemedText variant='title14' textcolor='#C2C2C2' fontFamily='PoppinsMedium'>Picture</ThemedText>
                            </View>
                        }

                    </View>
                    <View
                        style={tw`pb-[220px] w-full`}
                    >
                        <View
                            style={tw`w-full flex-row justify-between`}
                        >
                            <View
                                style={tw`w-[105px] flex flex-col justify-center items-center gap-[4px]`}
                            >
                                <SwitchForm />
                                <ThemedText variant='title12' fontFamily='NunitoRegular' textcolor='#C2C2C2'>
                                    Add Reminder
                                </ThemedText>
                            </View>
                            <BlueButton
                                width={142}
                                height={48}
                                text='Save'
                                onPress={showEditChecklistModal}
                            />
                        </View>
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
            <UploadImageComponent
                visible={isModalVisible}
                text='Upload from Device'
                onPress={handleFileUpload}
                onCancel={closeModal}
            />
            <UploadingModal
                visible={isUploadingModalVisible}
                progress={uploadProgress}
            />
            <SuccessModal
                visible={isStatusModalVisible}
                onCancel={closeStatusModal}
                onConfirm={closeStatusModal}
                statusText={isUploadSuccessful ? 'Completed!' : 'Successful!'}
                btnText={isUploadSuccessful ? 'Done' : 'View File'}
            />

            <ConfirmationModal
                visible={showConfirmationModal}
                onConfirm={() => { editCheckilist() }}
                onCancel={closeConfirmationModal}
                title="Are you sure you want to save this checklist?"
            />
        </MainBackground>
    )
}