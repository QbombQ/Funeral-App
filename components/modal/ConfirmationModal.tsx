import React from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import tw from "twrnc";
import { ThemedText } from '../ThemedText';

type ConfirmationModalProps = {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message?: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    title,
    message
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
            onRequestClose={onCancel}
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={tw`flex-1 justify-center items-center w-full h-full bg-[#FAFAFA] bg-opacity-5`}>
                    <View style={tw`w-[305px] h-[297px]`}>
                        <Image style={tw`absolute w-full h-full`} source={require("@/assets/images/modalback.png")} />
                        <View
                            style={tw`py-[26px] px-[10px] flex flex-col justify-around w-full h-full`}
                        >
                            <View
                                style={tw`flex flex-col gap-[13.5px] justify-center items-center`}
                            >
                                <ThemedText variant="title24" textcolor="#FFFFFF" fontFamily="RalewayBold" style={tw`text-center`}>
                                    {title}
                                </ThemedText>
                                {message &&
                                    <ThemedText variant="title22" textcolor="#BAC1C4" fontFamily="RalewayMedium" style={tw`text-center`}>
                                        {message}
                                    </ThemedText>
                                }
                            </View>

                            <View style={tw`flex-col gap-[14px] items-center`}>
                                <TouchableOpacity
                                    onPress={onConfirm}
                                    style={tw`w-[221px] h-[47px] border border-[#004CFF] rounded-[50px] justify-center`}
                                >
                                    <Image source={require('@/assets/images/ModalBack1.png')} style={tw`absolute top-[-1px] left-0`} />
                                    <ThemedText variant="title20" textcolor="#F6FBFD" fontFamily="NunitoMedium" style={tw`text-center`}>
                                        Yes
                                    </ThemedText>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={onCancel}
                                    style={tw`w-[221px] h-[47px] border border-[#004CFF] rounded-[50px] justify-center`}
                                >
                                    <Image source={require('@/assets/images/ModalBack2.png')} style={tw`absolute`} />
                                    <ThemedText variant="title20" textcolor="#FFFFFF" fontFamily="NunitoMedium" style={tw`text-center`}>
                                        No
                                    </ThemedText>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ConfirmationModal;
