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
    // Add more data objects as needed
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
                        {/* <View style={tw`w-[343px] h-[177px]`}>
                            <Image source={require('@/assets/images/checklistback2.png')} style={tw`absolute w-full h-full`} />

                            <View style={tw`px-[6px] flex flex-row h-full w-full gap-[12px]`}>
                                <View style={tw`flex justify-center items-center h-full`}>
                                    <Image source={require('@/assets/images/pfp.png')} style={tw`rounded-[100px] w-[48px] h-[48px]`} />
                                </View>

                                <View
                                    style={tw`flex flex-col justify-around h-full flex-grow`}
                                >
                                    <View
                                        style={tw`flex justify-between flex-row relative`}
                                    >
                                        <ThemedText variant='title18' textcolor='#FFFFFF' fontFamily='RalewayBold' style={tw`text-ellipsis overflow-hidden`}>Burial</ThemedText>
                                        <TouchableOpacity
                                            onPress={showOption}
                                        >
                                            <OptionIcon />
                                        </TouchableOpacity>
                                        {showOptionItem &&
                                            <View
                                                style={[
                                                    tw`absolute bottom-[-141px] right-[6px] gap-[3px] flex justify-end items-end`,
                                                    { zIndex: 50, position: 'absolute' }
                                                ]}
                                            >
                                                <Image source={require("@/assets/images/Polygon 2.png")} />
                                                <View

                                                    style={tw`w-[111px] h-[130px] z-[20] border border-[#004CFF] rounded-[4px] justify-between`}
                                                >
                                                    <Image source={require('@/assets/images/checklistoptionback.png')} style={tw`absolute w-full h-full`} />
                                                    <TouchableOpacity
                                                        style={tw`px-[8px] h-[26px] w-full flex justify-center`}
                                                    >
                                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                            Edit
                                                        </ThemedText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={tw`px-[8px] h-[26px] w-full flex justify-center`}
                                                    >
                                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                            View
                                                        </ThemedText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={tw`px-[8px] h-[26px] w-full flex justify-center`}
                                                    >
                                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                            Share
                                                        </ThemedText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={tw`px-[8px] h-[26px] w-full flex justify-center`}
                                                    >
                                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                            Download
                                                        </ThemedText>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={tw`px-[8px] h-[26px] w-full flex justify-center`}
                                                    >
                                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                                            Delete
                                                        </ThemedText>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        }
                                    </View>
                                    <View
                                        style={tw`flex flex-col gap-[4px]`}
                                    >
                                        <View
                                            style={tw`flex flex-row gap-[4px] items-center`}
                                        >
                                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`opacity-60`}>Name:</ThemedText>
                                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>Willams Alex</ThemedText>
                                        </View>
                                        <View
                                            style={tw`flex flex-row gap-[4px] items-center`}
                                        >
                                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`opacity-60`}>Date of Birth:</ThemedText>
                                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>o7-02-1963</ThemedText>
                                        </View>
                                        <View
                                            style={tw`flex flex-row gap-[4px] items-center`}
                                        >
                                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`opacity-60`}>Next of Kin:</ThemedText>
                                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>Alex John</ThemedText>
                                        </View>

                                    </View>
                                    <View
                                        style={tw`flex flex-row justify-between`}
                                    >
                                        <View
                                            style={tw`flex flex-row gap-[4px] items-center`}
                                        >
                                            <LocationsIcon />
                                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>Karnail Singh Stadium</ThemedText>
                                        </View>
                                        <View
                                            style={tw`flex flex-row gap-[4px] items-center`}
                                        >
                                            <PhoneNumberIcon />
                                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>+91 0211420420</ThemedText>
                                        </View>
                                    </View>
                                    <View
                                        style={tw`flex flex-row gap-[4px] items-center`}
                                    >
                                        <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>Upload Date:</ThemedText>
                                        <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>30 min ago</ThemedText>
                                    </View>
                                </View>
                            </View>
                        </View> */}
                        {dataList.map((data, index) => (
                            <CheckListCardItem
                                key={index}
                                data={data}
                            // showOption={handleOptionToggle}
                            // showOptionItem={showOptionItem}
                            />
                        ))}
                    </View>
                </ScrollView>
                <View style={[tw`w-[36px] h-[36px] flex justify-center items-center absolute bottom-[116px] right-[27px]`,{zIndex:30}]}>

                    <TouchableOpacity >
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
