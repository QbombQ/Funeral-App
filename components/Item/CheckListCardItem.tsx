import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import OptionIcon from '../icons/OptionIcon';
import LocationsIcon from '../icons/LocationsIcon';
import PhoneNumberIcon from '../icons/PhoneNumberIcon';
import { ThemedCheckBox } from '../input/ThemedCheckBox';
interface ProfileData {
    title: string;
    // name: string;
    // dob: string;
    // kin: string;
    // location: string;
    // phone: string;
    uploadDate: string;
    description: string

}

interface ProfileCardProps {
    data: ProfileData;
}

const CheckListCardItem: React.FC<ProfileCardProps & { onRemove: () => void }> = ({ data, onRemove }) => {
    const [showOptionItem, setShowOptionItem] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const handleOptionToggle = () => {
        setShowOptionItem(!showOptionItem);
    };

    const handleCheckBoxToggle = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            onRemove(); // Call the removal function when checked
        }
    };
    return (
        <View style={tw`w-[343px] h-[177px]`}>
            <Image source={require('@/assets/images/checklistback2.png')} style={tw`absolute w-full h-full`} />

            <View style={tw`px-[25px] py-[10px] flex flex-row h-full w-full gap-[12px]`}>
                {/* <View style={tw`flex justify-center items-center h-full`}>
                    <Image source={require('@/assets/images/pfp.png')} style={tw`rounded-[100px] w-[48px] h-[48px]`} />
                </View> */}

                <View style={tw`flex flex-col justify-around h-full flex-grow`}>
                    <View style={tw`flex justify-between flex-row relative`}>
                        <ThemedText variant='title18' textcolor='#FFFFFF' fontFamily='RalewayBold'>
                            {data.title}
                        </ThemedText>
                        <TouchableOpacity onPress={handleOptionToggle}>
                            <OptionIcon />
                        </TouchableOpacity>

                        {showOptionItem && (
                            <View style={[tw`absolute bottom-[-115px] right-[6px] gap-[3px] flex justify-end items-end`, { zIndex: 50, position: 'absolute' }]}>
                                <Image source={require('@/assets/images/Polygon 2.png')} />
                                <View style={tw`w-[111px] border border-[#004CFF] rounded-[4px] justify-between`}>
                                    <Image source={require('@/assets/images/checklistoptionback.png')} style={tw`absolute w-full h-full`} />
                                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                            Edit
                                        </ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                            View
                                        </ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                            Share
                                        </ThemedText>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                            Download
                                        </ThemedText>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`}>
                                        <ThemedText variant='title12' textcolor='#F6FBFD' fontFamily='NunitoMedium'>
                                            Delete
                                        </ThemedText>
                                    </TouchableOpacity> */}
                                    {/* ))} */}
                                </View>
                            </View>
                        )}
                    </View>

                    {/* <View style={tw`flex flex-col gap-[4px]`}>
                        <View style={tw`flex flex-row gap-[4px] items-center`}>
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`opacity-60`}>
                                Name:
                            </ThemedText>
                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.name}
                            </ThemedText>
                        </View>
                        <View style={tw`flex flex-row gap-[4px] items-center`}>
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`opacity-60`}>
                                Date of Birth:
                            </ThemedText>
                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.dob}
                            </ThemedText>
                        </View>
                        <View style={tw`flex flex-row gap-[4px] items-center`}>
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`opacity-60`}>
                                Next of Kin:
                            </ThemedText>
                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.kin}
                            </ThemedText>
                        </View>
                    </View> */}

                    <View style={tw`h-[95px]`}>
                        {/* <View style={tw`flex flex-row gap-[4px] items-center`}>
                            <LocationsIcon />
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.location}
                            </ThemedText>
                        </View>
                        <View style={tw`flex flex-row gap-[4px] items-center`}>
                            <PhoneNumberIcon />
                            <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                                {data.phone}
                            </ThemedText>
                        </View> */}
                        <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                            {data.description}
                        </ThemedText>
                    </View>

                    <View style={tw`flex flex-row gap-[4px] items-center`}>
                        <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                            Upload Date:
                        </ThemedText>
                        <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                            {data.uploadDate}
                        </ThemedText>
                    </View>
                    <View style={tw`mb-2 mt-1 flex-row items-center gap-2`}>
                        <ThemedCheckBox
                            checked={isChecked}
                            onPress={handleCheckBoxToggle}
                            size={13}
                        />
                        <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                            Confirm Checklist
                        </ThemedText>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default CheckListCardItem;
