import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { router, useGlobalSearchParams } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import CheckListUploadModal from '@/components/modal/CheckListUploadModal';
import UploadingModal from '@/components/modal/UpLoadingModal';
import SuccessModal from '@/components/modal/SuccessModal';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/context/api';
import { getFileComponent } from '@/utils/filePreview';

export default function ViewVault() {
    const { userId } = useAuth();
    const params = useGlobalSearchParams();

    const [vaultData, setVaultData] = useState<any>(null);
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);

    const { id } = params as { id: string };

    const fetchVaultDetail = async (vaultId: string) => {
        try {
            const response = await axiosInstance.post("/vault/getDetail", { userId, id: vaultId });
            setVaultData(response.data.data);

        } catch (error) {
            console.error("Error fetching vault details:", error);
        }
    };

    useEffect(() => {
        if (!vaultData) {
            fetchVaultDetail(id);
            return;
        }
    }, [id]);

    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1`}>
                <NavigationHeader title='View Vault' />
                <MainNavigationBar />

                <View style={tw`pt-[46px] flex px-[30px] w-full gap-[34px]`}>
                    {vaultData ? (
                        <>
                            <View style={tw`gap-[18px] flex flex-col`}>
                                {/* Title */}
                                <View style={tw`flex flex-row gap-[6.5px]`}>
                                    <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Title:</ThemedText>
                                    <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>{vaultData.title}</ThemedText>
                                </View>

                                {/* Description */}
                                <View style={tw`flex flex-row gap-[6.5px]`}>
                                    <ThemedText variant='title20' textcolor='#BAC1C4' style={tw`opacity-60`} fontFamily='RaleWaySemiBold'>Description:</ThemedText>
                                    <ThemedText variant='title20' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>{vaultData.desc}</ThemedText>
                                </View>
                            </View>

                            {/* Display Attached File */}
                            {vaultData.filePath && (
                                <View style={tw`w-full justify-center items-center`}>
                                    {getFileComponent(vaultData.filePath, vaultData.fileType)}
                                   
                                    <Image source={{uri:`https://i.sstatic.net/ZG7rI.png`}} style={tw`w-[100px] h-[100px]`} />

                                    <ThemedText variant='title14' textcolor='#C2C2C2' fontFamily='PoppinsMedium'>Attached File</ThemedText>
                                </View>
                            )}
                        </>
                    ) : (
                        <ActivityIndicator size="large" color="#004CFF" />
                    )}
                </View>
            </View>

            <CheckListUploadModal
                visible={isUploadModalVisible}
                onClose={() => setUploadModalVisible(false)}
                onCreateChecklist={() => router.push('/(home)/(checklist)/createchecklist')}
                onUpload={() => { }}
                isLoading={false}
            />
            <UploadingModal visible={isUploadingModalVisible} progress={uploadProgress} />
            <SuccessModal
                visible={isStatusModalVisible}
                onCancel={() => setStatusModalVisible(false)}
                onConfirm={() => setStatusModalVisible(false)}
                statusText='Completed!'
                btnText='Check File'
            />
        </MainBackground>
    );
}
