import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
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
import config from "@/config.json"
import FilePreview from '@/components/modal/FilePreview';
interface SelectedFile {
    uri: string;
    name: string;
    type: string;
}
export default function ViewVault() {
    const { userId } = useAuth();
    const params = useGlobalSearchParams();

    const [vaultData, setVaultData] = useState<any>(null);
    const [isUploadModalVisible, setUploadModalVisible] = useState(false);
    const [isUploadingModalVisible, setUploadingModalVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isStatusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    const [isVisiblePreviewModal, setIsVisiblePreviewModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { id } = params as { id: string };
    console.log(id);
    
    const fetchVaultDetail = async (vaultId: string) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post("/vault/getDetail", { userId, id: vaultId });

            if (!response.data || !response.data.data) {
                throw new Error("Vault data is null");
            }
            console.log(response.data.data);
            
            setVaultData(response.data.data);

            let fileUri = response.data.data.filePath;
            setSelectedFile({
                uri: fileUri,
                name: fileUri ? fileUri.split('/').pop() || '' : '',
                type: response.data.data.fileType
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!vaultData) {
            fetchVaultDetail(id);
            return;
        }
    }, [id]);
    const showPreviewModal = () => {
        setIsVisiblePreviewModal(!isVisiblePreviewModal)
    }
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1`}>
                <NavigationHeader title='View Vault' />
                <MainNavigationBar />
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full`}
                >
                    <View style={tw`pt-[46px] flex px-[30px] w-full gap-[34px]`}>
                        {vaultData && (
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
                                {`${config.server_base_url}:${config.server_port}${vaultData.uri}` && (
                                    <>

                                        <View style={tw`w-full h-full items-center`}>
                                            <View style={tw`w-full h-[300px]`}>
                                                {getFileComponent(`${config.server_base_url}:${config.server_port}${vaultData.filePath}`, vaultData.fileType)}

                                            </View>

                                            {/* {selectedFile.type.includes('image') && (
                                        <Image source={{ uri: `${config.server_base_url}:${config.server_port}${selectedFile.uri}` }} style={tw`w-[90%] h-[250px] rounded-lg`} />
                                    )}
                                    {selectedFile.type.includes('video') && (
                                        <Video source={{ uri: selectedFile.uri }} style={tw`w-[90%] h-[250px] rounded-lg`} useNativeControls />
                                    )}
                                    {selectedFile.type.includes('pdf') && (
                                        <WebView source={{ uri: selectedFile.uri }} style={{ flex: 1, width: '100%', height: 400 }} />
                                    )} */}
                                            {/* <Image source={{uri:`https://i.sstatic.net/ZG7rI.png`}} style={tw`w-[100px] h-[100px]`} /> */}

                                            {/* <ThemedText variant='title14' textcolor='#C2C2C2' fontFamily='PoppinsMedium'>Attached File</ThemedText> */}
                                            <TouchableOpacity
                                                onPress={showPreviewModal}
                                                style={[
                                                    tw`w-[45%] h-[50px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px] mt-[20px]`]}
                                            >
                                                <Image
                                                    source={require('@/assets/images/ModalBack1.png')}
                                                    style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
                                                />
                                                <ThemedText variant='title16' textcolor='#F6FBFD' style={{ fontFamily: "NunitoMedium" }}>
                                                    Preview
                                                </ThemedText>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )}

                            </>
                        )
                        }
                        {isVisiblePreviewModal == true && selectedFile &&
                            <FilePreview
                                fileUri={`${config.server_base_url}:${config.server_port}${vaultData.filePath}`}
                                fileType={vaultData.fileType}
                                // fileName={vaultData.name}
                                onClose={showPreviewModal}
                            />
                        }
                    </View>
                    {
                        loading &&
                        <>
                            <View
                                style={tw`w-full flex-1 justify-center items-center absolute h-full bg-black bg-opacity-30`}
                            >
                                <ActivityIndicator size="large" color="#004CFF" />
                            </View>
                        </>
                    }
                </ScrollView>
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
