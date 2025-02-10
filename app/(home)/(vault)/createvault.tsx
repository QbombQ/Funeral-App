import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { router } from "expo-router";
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
import UploadImageIcon from '@/components/icons/UploadImageIcon';
import * as DocumentPicker from 'expo-document-picker';
import axiosInstance from '@/context/api';
import { NormalButton } from '@/components/button/NormalButton';
import FilePreview from '@/components/modal/FilePreview';
import { useAuth } from '@/context/AuthContext';
import Toast from 'react-native-toast-message';
import NeedMembershipModal from '@/components/modal/NeedMembershipModal';
interface SelectedFile {
    uri: string;
    name: string;
    type: string;
}

export default function CreateVault() {
    const { userId } = useAuth()
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [showItem, setShowItem] = useState(false)
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [isShowUploadedImage, setShowUploadedImage] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [isUploadSuccessful, setIsUploadSuccessful] = useState(false);
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [isVisiblePreviewModal, setIsVisiblePreviewModal] = useState(false);
    const [vaultId, setVaultId] = useState('')

    const [showNeedMembershipModal, setShowNeedMembershipModal] = useState(false);

    const showPreviewModal = () => {
        setIsVisiblePreviewModal(!isVisiblePreviewModal)
    }
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
    const toSubscription = () => {
        router.push('/(home)/(budget)/subscription')
    }
    const showMemberShipModal = () => {
        setShowNeedMembershipModal(!showNeedMembershipModal)
    }
    const closeStatusModal = () => {
        setStatusModalVisible(false);
        if (isUploadSuccessful) {
            setIsUploadSuccessful(false);
        } else {
            router.push({
                pathname: "/(home)/(vault)/viewvault",
                params: {
                    id: vaultId
                }
            });
        }
    }
    const pickFile = async (): Promise<void> => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (result.canceled) {
                return;
            }

            const file: SelectedFile = {
                uri: result.assets[0].uri,
                name: result.assets[0].name,
                type: result.assets[0].mimeType || 'application/octet-stream'
            };

            setSelectedFile(file);
            setShowUploadedImage(true)
        } catch (error) {
        }
    };
    const removeSelectedFile = () => {
        setSelectedFile(null);
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
    const addChecklist = () => {
        if (!title || !description || !userId) {
            // alert("Please enter a title and description.");
            Toast.show({
                type: "error",
                text1: "Missing field",
                text2: "Please enter a title and description.",
            });
            return;
        }
        if (!selectedFile) {
            Toast.show({
                type: "error",
                text1: "Missing field",
                text2: "Please select a file to upload.",
            });
            return;
        }
        setShowConfirmationModal(true)
    }
    const showSuccessfulModal = () => {
        setStatusModalVisible(true)
        setShowConfirmationModal(false)

    }
    const closeUploadModal = () => setUploadModalVisible(false);
    const handleCreateChecklist = () => {
        router.push('/(home)/(vault)')
    };
    const createVault = async (): Promise<void> => {
        setIsUploading(true);
        if (!selectedFile) {
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        formData.append("desc", description);
        formData.append("userId", userId || '');
        let fileUri = selectedFile?.uri || '';

        // Fix file URI for Android
        if (Platform.OS === "android" && !fileUri.startsWith("file://")) {
            fileUri = "file://" + fileUri;
        }
        formData.append("file", {   
            uri: selectedFile.uri,
            name: selectedFile.name,
            type: selectedFile.type
        } as any);

        try {
            const response = await axiosInstance.post("/vault/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            Toast.show({
                type: "success",
                text1: "Vault Created",
                text2: "Vault created successfully!",
            });
            setStatusModalVisible(true)
            setShowConfirmationModal(false);
            setVaultId(response.data.id)
        } catch (error: any) {
            // console.error("Error creating vault:", error.response?.data || error.message);
            showMemberShipModal()
            closeConfirmationModal()
        } finally {
            setIsUploading(false);
        }

    };

    return (
        <MainBackground title=''>
            <View style={tw`flex-1`}>
                <NavigationHeader title='Add Vault' />
                <MainNavigationBar />
                <ScrollView
                    contentContainerStyle={tw`flex-grow justify-center`}
                    style={tw`w-full h-full pb-[120px]`}
                >
                    <View
                        style={tw`mt-[20px] w-full h-full px-[23px] gap-[18px] pb-[120px]`}
                    >
                        <View
                            style={tw`gap-[12px] justify-center w-full`}
                        >
                            <View
                                style={tw`w-full rounded-[12px] w-full bg-[#1D2C4F] bg-opacity-60 flex flex-col gap-[8px]`}
                            >
                                <View
                                    style={tw`p-[12px] gap-[8px]`}
                                >
                                    <View
                                        style={tw`w-full flex flex-row`}
                                    >
                                        <View
                                            style={tw`flex flex-col gap-[6px] w-full`}
                                        >
                                            <ThemedText variant='title12' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>
                                                Title:
                                            </ThemedText>
                                            <NormalInput
                                                placeholder="E.g Name"
                                                value={title}
                                                onChangeText={setTitle}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={tw`w-full flex flex-row`}
                                    >
                                        <View
                                            style={tw`flex flex-col gap-[6px] w-full`}
                                        >
                                            <ThemedText variant='title12' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>
                                                Description:
                                            </ThemedText>
                                            <NormalInput
                                                placeholder="E.g Description"
                                                value={description}
                                                onChangeText={setDescription}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {isShowUploadedImage && selectedFile ?
                                <>
                                    <View style={tw`w-full justify-center items-center`}>
                                        <Image source={{ uri: selectedFile.uri }} style={tw`w-[90%] h-[250px] rounded-lg`} />

                                        <ThemedText variant='title14' textcolor='#C2C2C2' fontFamily='PoppinsMedium'>{selectedFile.name}</ThemedText>
                                    </View>
                                    <View style={tw`flex flex-row w-full gap-3 justify-around`}>
                                        <TouchableOpacity
                                            onPress={showPreviewModal}
                                            style={[
                                                tw`w-[45%] h-[50px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px]`]}
                                        >
                                            <Image
                                                source={require('@/assets/images/ModalBack1.png')}
                                                style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
                                            />
                                            <ThemedText variant='title16' textcolor='#F6FBFD' style={{ fontFamily: "NunitoMedium" }}>
                                                Preview
                                            </ThemedText>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={removeSelectedFile}
                                            style={[
                                                tw`w-[45%] h-[50px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px]`]}
                                        >
                                            <Image
                                                source={require('@/assets/images/ModalBack2.png')}
                                                style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
                                            />
                                            <ThemedText variant='title16' textcolor='#F6FBFD' style={{ fontFamily: "NunitoMedium" }}>
                                                Remove
                                            </ThemedText>
                                        </TouchableOpacity>

                                    </View>
                                    {isVisiblePreviewModal &&
                                        <FilePreview
                                            fileUri={selectedFile.uri}
                                            fileType={selectedFile.type}
                                            fileName={selectedFile.name}
                                            onClose={showPreviewModal}
                                        />
                                    }
                                </>
                                :
                                <View style={tw`w-full h-[205px] bg-[#181818] rounded-[24px] justify-center items-center`}>
                                    <TouchableOpacity style={tw`w-[133px] h-[133px] rounded-[12px] bg-[#004CFF] bg-opacity-50 justify-center items-center gap-[8.5px]`}
                                        onPress={pickFile}
                                    >
                                        <View
                                            style={tw`w-[58px] h-[58px] justify-center items-center border border-[#95989A] rounded-[5px]`}
                                        >
                                            <UploadImageIcon />
                                        </View>
                                        <ThemedText
                                            variant="title14"
                                            textcolor="#C2C2C2"
                                            fontFamily="PoppinsMedium"
                                            style={tw`text-center`}
                                        >
                                            Upload from Device
                                        </ThemedText>
                                    </TouchableOpacity>
                                    <ThemedText variant='title12' textcolor='#C2C2C2' fontFamily='PoppinsMedium' style={tw`text-center pt-[10px]`}>
                                        You may upload any file type (e.g., PDF, JPG, MP4 etc.).
                                    </ThemedText>
                                </View>

                            }

                        </View>
                        <View
                            style={tw`pt-[20px] w-full`}
                        >
                            <View
                                style={tw`w-full flex-row justify-between`}
                            >
                                <BlueButton
                                    width={142}
                                    height={48}
                                    text='Add'
                                    onPress={addChecklist}
                                />
                            </View>
                        </View>

                    </View>
                </ScrollView>
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
                onConfirm={createVault}
                onCancel={closeConfirmationModal}
                title="Are you sure you want to add this vault?"
            />
            <NeedMembershipModal
                visible={showNeedMembershipModal}
                onConfirm={toSubscription}
                title='Please Upgrade Your Membership'
                onCancel={showMemberShipModal}
            />
        </MainBackground>
    )
}