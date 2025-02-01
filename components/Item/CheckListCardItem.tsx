import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Share } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import OptionIcon from '../icons/OptionIcon';
import { ThemedCheckBox } from '../input/ThemedCheckBox';
import { router } from 'expo-router';
import ShareChecklistModal from '../modal/ShareChecklistModal';
interface ChecklistItem {
    title: string;
    description: string;
    uploadDate: string;
    completed: boolean;
}

interface CheckListCardItemProps {
    data: ChecklistItem;
    onCheck: () => void;
    onRemove: () => void;
}

const CheckListCardItem: React.FC<CheckListCardItemProps> = ({
    data,
    onCheck,
    onRemove,
}) => {
    const [showOptionItem, setShowOptionItem] = useState(false);
    const [showShareChecklistModal, setShowShareChecklistModal] = useState(false);
    const handleOptionToggle = () => {
        setShowOptionItem((prev) => !prev);
    };
    const viewChecklist = () => {
        router.push("/(checklist)/viewchecklist")
    }
    const editChecklist = () => {
        router.push("/(checklist)/editchecklist")
    }
    const shareChecklist = () => {
        setShowShareChecklistModal(!showShareChecklistModal);
    }
    return (
        <View style={tw`w-full h-[100px] rounded-lg border border-[#004CFF] bg-transparent`}>
            <Image
                source={require('@/assets/images/carditem(chechlist).png')}
                style={tw`absolute w-full h-full rounded-lg`}
            />

            <View style={tw`px-4 py-3 flex flex-row h-full w-full gap-3`}>
                <View style={tw`flex flex-col justify-between flex-grow`}>
                    <View style={tw`flex flex-row justify-between`}>
                        <ThemedText variant='title16' textcolor='#FFFFFF' fontFamily='RalewayBold'>
                            {data.title}
                        </ThemedText>
                        <TouchableOpacity onPress={handleOptionToggle}>
                            <OptionIcon />
                        </TouchableOpacity>
                    </View>

                    {showOptionItem && (
                        <View style={tw`absolute top-[30px] right-[5px] gap-1 z-50 flex items-end`}>
                            <Image source={require('@/assets/images/Polygon 2.png')} />
                            <View style={tw`w-[111px] border border-[#004CFF] rounded-md`}>
                                <Image
                                    source={require('@/assets/images/checklistoptionback.png')}
                                    style={tw`absolute w-full h-full rounded-md`}
                                />
                                <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={editChecklist}>
                                    <ThemedText variant='title12' textcolor='#F6FBFD'>
                                        Edit
                                    </ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={viewChecklist}>
                                    <ThemedText variant='title12' textcolor='#F6FBFD'>
                                        View
                                    </ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={shareChecklist}>
                                    <ThemedText variant='title12' textcolor='#F6FBFD'>
                                        Share
                                    </ThemedText>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`px-2 h-6 flex justify-center`}>
                                    <ThemedText variant='title12' textcolor='#F6FBFD'>
                                        Download
                                    </ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={onRemove} style={tw`px-2 h-6 flex justify-center`}>
                                    <ThemedText variant='title12' textcolor='#F6FBFD'>
                                        Delete
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={tw`flex-1 mt-1`}>
                        <ThemedText
                            variant='title14'
                            fontFamily='RaleWaySemiBold'
                            textcolor='#BAC1C4'
                            numberOfLines={1}
                            ellipsizeMode='tail'
                        >
                            {data.description}
                        </ThemedText>
                    </View>

                    <View style={tw`flex flex-row items-center justify-between mt-1`}>
                        <View style={tw`flex flex-row items-center gap-1`}>
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                Upload Date:
                            </ThemedText>
                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.uploadDate}
                            </ThemedText>
                        </View>

                        <View style={tw`flex flex-row items-center gap-2`}>
                            <ThemedCheckBox
                                checked={data.completed}
                                onPress={onCheck}
                                size={13}
                            />
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.completed ? 'Completed' : 'Completed'}
                            </ThemedText>
                        </View>
                    </View>
                </View>
            </View>
            <ShareChecklistModal
                visible={showShareChecklistModal}
                onClose={shareChecklist}
            />
        </View>
    );
};

export default CheckListCardItem;
