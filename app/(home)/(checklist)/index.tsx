import React, { useState } from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Switch
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import DashBoardCardComponent from '@/components/ui/DashBoardCardComponent';
import CheckListNavigation from '@/components/navigation/CheckListNavigation';
import OptionIcon from '@/components/icons/OptionIcon';
import { FeSpotLight } from 'react-native-svg';
import LocationsIcon from '@/components/icons/LocationsIcon';
import PhoneNumberIcon from '@/components/icons/PhoneNumberIcon';
import CheckListCardItem from '@/components/Item/CheckListCardItem';
import CheckListUploadModal from '@/components/modal/CheckListUploadModal';
import UploadingModal from '@/components/modal/UpLoadingModal';
import SuccessModal from '@/components/modal/SuccessModal';
const dataList = [
    {
        title: 'Burial',
        name: 'Willams Alex',
        dob: '07-02-1963',
        kin: 'Alex John',
        location: 'Karnail Singh Stadium',
        phone: '+1 0211420420',
        uploadDate: '30 min ago',
    },
    {
        title: 'Burial',
        name: 'Willams Alex',
        dob: '07-02-1963',
        kin: 'Alex John',
        location: 'Karnail Singh Stadium',
        phone: '+1 0211420420',
        uploadDate: '30 min ago',
    },
    {
        title: 'Burial',
        name: 'Willams Alex',
        dob: '07-02-1963',
        kin: 'Alex John',
        location: 'Karnail Singh Stadium',
        phone: '+1 0211420420',
        uploadDate: '30 min ago',
    },
    {
        title: 'Burial',
        name: 'Willams Alex',
        dob: '07-02-1963',
        kin: 'Alex John',
        location: 'Karnail Singh Stadium',
        phone: '+1 0211420420',
        uploadDate: '30 min ago',
    },
    {
        title: 'Burial',
        name: 'Willams Alex',
        dob: '07-02-1963',
        kin: 'Alex John',
        location: 'Karnail Singh Stadium',
        phone: '+1 0211420420',
        uploadDate: '30 min ago',
    },
];
export default function Index() {
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
                <CheckListNavigation openModal={openUploadModal} title="Checklist"/>
                <MainNavigationBar />
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full`}
                >
                    <View
                        style={tw`w-full h-full flex pt-[19px] px-[11px] items-center gap-[8px]`}
                    >
                        {dataList.map((data, index) => (
                            <CheckListCardItem
                                key={index}
                                data={data}

                            />
                        ))}
                    </View>
                </ScrollView>
                <View style={[tw`w-[36px] h-[36px] flex justify-center items-center absolute bottom-[116px] right-[27px]`,{zIndex:30}]}>

                    <TouchableOpacity onPress={handleCreateChecklist} >
                        <Image source={require("@/assets/images/09. More.png")} />
                    </TouchableOpacity>
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
