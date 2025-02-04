import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import NormalInput from '@/components/input/NormalInput';
import CreateBudgetItemModal from '@/components/modal/CreateBudgetItemModal';
import CrossIcon from '@/components/icons/CrossIcon';
import BudgetItemComponent from '@/components/Item/BudgetItem';

interface BudgetItem {
    title: any,
    budget: number
}

export default function Index() {
    const [totalBudget, setTotalBudget] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(0);
    const [isCreateModalVisible, setCreateModalVisible] = useState(false);
    const [dataList, setDataList] = useState<BudgetItem[]>([
        // {
        //     title: 'Burial A',
        //     budget: 1000
        // },
        // {
        //     title: 'Burial B',
        //     budget: 3000
        // }
    ]);

    const [temporaryBudget, setTemporaryBudget] = useState(0);

    const openCreateModal = () => setCreateModalVisible(!isCreateModalVisible);
    const handleCreateBudgetItem = (newItem: BudgetItem) => {
        setDataList(prevList => {
            const updatedList = [...prevList, newItem];
            const updatedRemainingBudget = totalBudget - updatedList.reduce((acc, item) => acc + Number(item.budget), 0);
            setRemainingBudget(updatedRemainingBudget);
            return updatedList;
        });
        setCreateModalVisible(false);
    };

    const handleRemoveItem = (index: number) => {
        setDataList(prevList => {
            const updatedList = prevList.filter((_, idx) => idx !== index);
            const updatedRemainingBudget = totalBudget - updatedList.reduce((acc, item) => acc + Number(item.budget), 0);
            setRemainingBudget(updatedRemainingBudget);
            return updatedList;
        });
    };

    const handleTotalBudgetChange = (value: number) => {
        setTemporaryBudget(Number(value));
    };

    const handleSetTotalBudget = () => {
        const newTotalBudget = temporaryBudget || 0;
        setTotalBudget(newTotalBudget);

        const sumOfItemsBudget = dataList.reduce((acc, item) => acc + Number(item.budget), 0);

        const newRemainingBudget = Math.max(0, newTotalBudget - sumOfItemsBudget);
        setRemainingBudget(newRemainingBudget);
    };

    return (
        <>
            <MainBackground title="">
                <View style={tw`w-full h-full flex flex-1`}>
                    <NavigationHeader title="Budget" />
                    <MainNavigationBar />
                    <ScrollView
                        contentContainerStyle={tw`flex-grow justify-center`}
                        style={tw`w-full h-full`}
                    >
                        <View style={tw`w-full h-full flex-1 flex items-center pt-[20px] px-[20px]`}>
                            <View style={tw`w-full rounded-[12px] w-full bg-[#1D2C4F] bg-opacity-60 flex flex-col gap-[12px] p-4`}>
                                <View style={tw`flex flex-row w-full`}>
                                    <View style={tw`w-[50%]`}>
                                        <ThemedText variant="title12" textcolor="#FFFFFF" fontFamily="RaleWaySemiBold">
                                            Total Budget: ${totalBudget}
                                        </ThemedText>
                                    </View>
                                    <View style={tw`w-[50%]`}>
                                        <ThemedText variant="title12" textcolor="#FFFFFF" fontFamily="RaleWaySemiBold">
                                            Remaining Budget: ${remainingBudget}
                                        </ThemedText>
                                    </View>
                                </View>
                                <View style={tw`w-full gap-[6px]`}>
                                    <ThemedText variant="title14" textcolor="#FFFFFF">Total Budget:</ThemedText>
                                    <View style={tw`flex flex-row justify-start items-center w-full gap-[20px]`}>
                                        <View style={tw`w-[60%]`}>
                                            <NormalInput
                                                placeholder="5000"
                                                value={temporaryBudget}
                                                onChangeText={handleTotalBudgetChange}
                                                keyboardType="numeric"
                                            />
                                        </View>
                                        <TouchableOpacity
                                            style={[tw`w-[100px] h-[30px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px]`]}
                                            onPress={handleSetTotalBudget}
                                        >
                                            <Image
                                                source={require('@/assets/images/ModalBack1.png')}
                                                style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
                                            />
                                            <ThemedText variant="title14" textcolor="#F6FBFD" style={{ fontFamily: "NunitoMedium" }}>
                                                Set
                                            </ThemedText>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={tw`gap-[8px]`}>
                                    {dataList.map((data, index) => (
                                        <BudgetItemComponent
                                            key={index}
                                            data={data}
                                            onRemove={() => handleRemoveItem(index)}
                                        />
                                    ))}
                                </View>
                                <View
                                    style={tw`w-full justify-center items-center`}
                                >
                                    {/* <TouchableOpacity onPress={openCreateModal}>
                                        <Image source={require("@/assets/images/09. More.png")} />
                                    </TouchableOpacity> */}
                                    <TouchableOpacity
                                        onPress={openCreateModal}
                                        style={[
                                            tw`w-[283px] h-[50px] flex flex-row justify-center items-center border border-[#004CFF] rounded-[56px]`
                                        ]}
                                    >
                                        <Image
                                            source={require('@/assets/images/01. Primary Button.png')}
                                            style={tw`w-full h-full absolute top-0 left-0 rounded-full`}
                                        />
                                        <ThemedText variant='title16' textcolor='#F6FBFD' style={{ fontFamily: "NunitoMedium" }}>
                                            Add Budget Plan
                                        </ThemedText>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <View
                    style={[
                        tw`w-[36px] h-[36px] flex justify-center items-center absolute bottom-[116px] right-[27px]`,
                        { zIndex: 30 },
                    ]}
                >

                </View>
            </MainBackground>
            <CreateBudgetItemModal
                visible={isCreateModalVisible}
                onClose={openCreateModal}
                onCreate={handleCreateBudgetItem}
            />
        </>
    );
}
