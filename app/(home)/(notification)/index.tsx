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
import NotificationItem from '@/components/Item/NotificationItem';

export default function Index() {
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [openOptionId, setOpenOptionId] = useState<string | number | null>(null);

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
    const showVaultCreateOption = () => {
        setShowAddVaultOption(!showAddVaultOption)
    };
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1 `}>
                <NavigationHeader title="Notification" />
                <MainNavigationBar />
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full px-[25px]`}
                >
                    <View
                        style={tw`w-full h-full flex items-center gap-[8px] pb-[120px] pt-[24px]`}
                    >
                        {/* {dataList.map(item => (
                            <NotificationItem key={item.id} item={item} onDelete={handleDelete} openOptionId={openOptionId} setOpenOptionId={setOpenOptionId    } />
                        ))} */}
                    </View>
                </ScrollView>
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
        </MainBackground>
    );
}
