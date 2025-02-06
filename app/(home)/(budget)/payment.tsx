import React, { useState } from 'react';
import {
    View,
    ScrollView
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import { ThemedText } from '@/components/ThemedText';
import PaymentInput from '@/components/input/PaymentInput';
import { ThemedCheckBox } from '@/components/input/ThemedCheckBox';
import PaypalIcon from '@/components/icons/PaypalIcon';
import { BlueButton } from '@/components/button/BlueButton';
import PaymentSuccessModal from '@/components/modal/PaymentSuccessModal';


export default function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [selectedOption, setSelectedOption] = useState("paypal")
    const [showPamentModal, setShowPaymentModal] = useState(false)
    const setPaymentMethod = (value: string) => {
        setSelectedOption(value);
    }
    const showSuccessModal = () => {
        setShowPaymentModal(!showPamentModal)
    }
    const toDashBoard = () => {
        router.push("/(home)/home")
    }
    const toBudget = () => {
        router.push("/(home)/(budget)")
    }
    return (
        <MainBackground title=''>
            <View style={tw`w-full h-full flex flex-1 `}>
                <NavigationHeader title="" />
                <ScrollView
                    contentContainerStyle={tw`flex-grow`}
                    style={tw`w-full h-full`}
                >
                    <View
                        style={tw`w-full h-full flex-1 flex items-center px-[12px] pt-[19px] gap-[45px] pb-[30px]`}
                    >
                        <View
                            style={tw`w-full gap-[8px] flex flex-col items-center`}
                        >
                            <ThemedText variant='title18' fontFamily='RaleWaySemiBold' textcolor='#FFFFFF' >Subscribe for $9.99/Years</ThemedText>
                            <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4' style={tw`w-[263px] text-center`} >Enjoy full access to all tools and peace of mind</ThemedText>
                        </View>
                        <View
                            style={tw`bg-[#141A23] w-full rounded-[24px] py-[25px] px-[13px] justify-around`}
                        >
                            <View
                                style={tw`gap-[18px]`}
                            >
                                <View
                                    style={tw`gap-[9px]`}
                                >
                                    <View
                                        style={tw`gap-[4px]`}
                                    >
                                        <ThemedText variant='title14' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>Card Number:</ThemedText>
                                        <PaymentInput placeholder='2039 xxxx xxxx xxxx xxxx' value={cardNumber} onChangeText={setCardNumber} />
                                    </View>
                                    <View
                                        style={tw`gap-[4px]`}
                                    >
                                        <ThemedText variant='title14' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>Expiration Date:</ThemedText>
                                        <PaymentInput placeholder='07-27' value={expDate} onChangeText={setExpDate} />
                                    </View>
                                    <View
                                        style={tw`gap-[4px]`}
                                    >
                                        <ThemedText variant='title14' fontFamily='PoppinsMedium' textcolor='#C2C2C2'>CVV</ThemedText>
                                        <PaymentInput placeholder='xxx' value={cvv} onChangeText={setCVV} />
                                    </View>

                                </View>
                                <View
                                    style={tw`flex flex-row gap-[16px] items-center`}
                                >
                                    <ThemedCheckBox
                                        size={20}
                                        checked={selectedOption === "paypal"}
                                        onPress={() => setPaymentMethod("paypal")}
                                    />
                                    <View
                                        style={tw`flex flex-row gap-[5px] items-center`}
                                    >
                                        <PaypalIcon />
                                        <ThemedText variant='title20' fontFamily='NunitoRegular' textcolor='#95989A'>Paypal</ThemedText>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={tw`pt-[36px] pb-[29px] flex justify-center items-center`}
                            >
                                <BlueButton width={326} text="Confirm Payment" onPress={showSuccessModal} />

                            </View>
                        </View>
                    </View>

                </ScrollView>
            </View>
            <PaymentSuccessModal
                visible={showPamentModal}
                onConfirm={toDashBoard}
                statusText='Subscription Confirmed!'
                mainMessage='Thank you for subscribing'
                additionalMessage='You now have full access to all tools'
                btnText='Go to Dashboard'
            />
        </MainBackground>
    );
}
