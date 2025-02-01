import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Share } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import OptionIcon from '../icons/OptionIcon';
import { ThemedCheckBox } from '../input/ThemedCheckBox';
import { router } from 'expo-router';
import ShareChecklistModal from '../modal/ShareChecklistModal';
import CrossIcon from '../icons/CrossIcon';
interface BudgetItem {
    title: any;
    budget:any
}

interface BudgetItemProps {
    data: BudgetItem;
    // onCheck: () => void;
    onRemove?: () => void;
}

const BudgetItem: React.FC<BudgetItemProps> = ({
    data,
    // onCheck,
    onRemove,
}) => {

    return (
        <View style={tw`w-full h-[80px] rounded-lg border border-[#004CFF] bg-transparent`}>
            <Image
                source={require('@/assets/images/carditem(chechlist).png')}
                style={tw`absolute w-full h-full rounded-lg`}
            />

            <View style={tw`px-4 py-1 flex flex-row h-full w-full gap-3`}>
                <View style={tw`flex flex-col justify-around flex-grow`}>
                    <ThemedText variant='title16' textcolor='#FFFFFF' fontFamily='RalewayBold'>
                        {data.title}
                    </ThemedText>
                    <ThemedText
                        variant='title14'
                        fontFamily='RaleWaySemiBold'
                        textcolor='#BAC1C4'
                        numberOfLines={1}
                        ellipsizeMode='tail'
                    >
                        ${data.budget}
                    </ThemedText>

                </View>
                <TouchableOpacity style={tw`justify-center`} onPress={onRemove}>
                    <CrossIcon />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default BudgetItem;
