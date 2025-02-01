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
const ShareChecklistModal = ({ visible, onClose, onCreate }:any) => {
    const [title, setTitle] = useState('');
    // const [description, setDescription] = useState('');

    const handleCreate = () => {
        // if (title.trim()) {
        //     onCreate({ title});
        //     setTitle('');
        //     // setDescription('');
        //     onClose(); 
        // } else {
        //     alert('Please fill in both fields.');
        // }
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
                        Share Checklist
                    </ThemedText>
                    <FormInput
                        placeholder="Email"
                        value={title}
                        onChangeText={setTitle}
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
                                Share
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default ShareChecklistModal;
