import React, { useState } from 'react';
import {
    Modal,
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import tw from 'twrnc';
import FormInput from '../input/FormInput';
import { ThemedText } from '../ThemedText';
import Toast from 'react-native-toast-message';
import { usePathname } from 'expo-router';

const ShareChecklistModal = ({ visible, onClose, onCreate, title, btntext, sharedUser }: any) => {
    const [email, setEmail] = useState('');
    const pathname = usePathname();
    // const [description, setDescription] = useState('');
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleCreate = () => {
        if (email.trim() && validateEmail(email)) {
            onCreate({ email });
            setEmail('');
            // setDescription('');
            onClose();
        } else {
            Toast.show({
                type: "error",
                text1: "Invalid Email",
                text2: "Please enter a valid email address.",
            });
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                <View style={tw`w-[90%] bg-[#0D1B3B] p-5 rounded-lg gap-[20px]`}>
                    <ThemedText variant="title20" textcolor="#FFFFFF" fontFamily="RaleWaySemiBold">
                        {title}
                    </ThemedText>
                    {
                        pathname == "/shareme" &&
                        <View>
                            <ThemedText variant="title16" textcolor="#FFFFFF" fontFamily="RaleWaySemiBold">
                                Shared User
                            </ThemedText>
                            <ThemedText variant="title14" textcolor="#FFFFFF" fontFamily="RaleWaySemiBold">
                                {sharedUser}
                            </ThemedText>
                        </View>
                    }
                    <FormInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {/* <FormInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                    /> */}
                    <View style={tw`flex-row justify-center w-full items-center gap-4 px-2`}>
                        <TouchableOpacity
                            onPress={onClose}
                            style={tw`w-[50%] h-[47px] border border-[#004CFF] rounded-[50px] justify-center`}
                        >
                            <Image source={require('@/assets/images/ModalBack2.png')} style={tw`absolute top-[-1px] left-0 w-full h-full rounded-full`} />
                            <ThemedText variant="title20" textcolor="#F6FBFD" fontFamily="NunitoMedium" style={tw`text-center`}>
                                Cancel
                            </ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleCreate}
                            style={tw`w-[50%] h-[47px] border border-[#004CFF] rounded-[50px] justify-center`}
                        >
                            <Image source={require('@/assets/images/ModalBack1.png')} style={tw`absolute w-full h-full rounded-full`} />
                            <ThemedText variant="title20" textcolor="#FFFFFF" fontFamily="NunitoMedium" style={tw`text-center`}>
                                {btntext}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default ShareChecklistModal;
