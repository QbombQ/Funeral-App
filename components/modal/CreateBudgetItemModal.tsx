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
const CreateChecklistModal = ({ visible, onClose, onCreate }: any) => {
    const [title, setTitle] = useState('');
    const [budget, setBudget] = useState(0);

    const handleCreate = () => {
        if (title.trim() && budget > 0) {
            onCreate({ title, budget });
            setTitle('');
            setBudget(0);
        } else {
            alert('Please fill in both fields.');
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
                        Create BudgetItem
                    </ThemedText>
                    <FormInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <FormInput
                        placeholder="Budget"
                        value={budget}
                        onChangeText={setBudget}
                        keyboardType="numeric"
                    />
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
                                Create
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


export default CreateChecklistModal;
