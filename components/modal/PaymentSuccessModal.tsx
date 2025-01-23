
import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import tw from "twrnc";
import { ThemedText } from '../ThemedText';
import MainBackground from '../background/MainBackground';
import { PrimaryButton } from '../button/PrimaryButton';
import { NormalButton } from '../button/NormalButton';

type PaymentSuccessModalProps = {
    visible: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
    statusText: string;
    mainMessage: string;
    additionalMessage: string;
    btnText: string;
};

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    statusText,
    mainMessage,
    additionalMessage,
    btnText
}) => {
    if (!visible) return null; 

    return (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-full z-30`}>
            <MainBackground title=''>
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={tw`flex-1 justify-center items-center w-full h-full`}>
                        <View style={tw`w-[340px] h-[433px] flex justify-center items-center`}>
                            <Image source={require("@/assets/images/Paymentmodalbackground.png")} style={tw`absolute w-full h-full`} />
                            <View style={tw`w-full h-full py-[15px] px-[16px] flex flex-col justify-between items-center`}>
                                <ThemedText variant='title26' fontFamily='RalewayBold' textcolor='#40BF81'>
                                    {statusText}
                                </ThemedText>
                                <View style={tw`gap-[12px] flex flex-col w-full justify-center items-center`}>
                                    <Image source={require("@/assets/images/Check.png")} />
                                    <View
                                        style={tw`gap-[4px] flex flex-col justify-center items-center`}
                                    >
                                        <ThemedText variant='title24' textcolor='#BAC1C4' fontFamily='RaleWaySemiBold'>{mainMessage}</ThemedText>
                                        <ThemedText variant='title16' textcolor='#BAC1C4' fontFamily='RalewayMedium'>{additionalMessage}</ThemedText>
                                    </View>
                                </View>
                                <NormalButton width={230} text={btnText} onPress={onConfirm} />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </MainBackground>
        </View>
    );
};

export default PaymentSuccessModal;
