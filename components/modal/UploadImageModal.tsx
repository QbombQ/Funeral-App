import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import tw from 'twrnc'; // Import twrnc for TailwindCSS styles
import { ThemedText } from '../ThemedText'; // Adjust path if necessary
import UploadImageIcon from '../icons/UploadImageIcon'; // Adjust path if necessary

interface UploadImageComponentProps {
    visible: boolean;
    text: string;
    onPress: () => void;
    onCancel: () => void;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({
    visible,
    text,
    onPress,
    onCancel
}) => {
    if (!visible) return null;
    return (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-full z-5 flex justify-center items-center bg-white bg-black bg-opacity-50`}>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={tw`w-full px-[12px]`}>

                    <View style={tw`w-full h-[205px] bg-[#181818] rounded-[24px] justify-center items-center`}>
                        <TouchableOpacity style={tw`w-[133px] h-[133px] rounded-[12px] bg-[#004CFF] bg-opacity-50 justify-center items-center gap-[8.5px]`}
                        onPress={onPress}
                        >
                            <View
                                style={tw`w-[58px] h-[58px] justify-center items-center border border-[#95989A] rounded-[5px]`}
                            >
                                <UploadImageIcon />
                            </View>
                            <ThemedText
                                variant="title14"
                                textcolor="#C2C2C2"
                                fontFamily="PoppinsMedium"
                                style={tw`text-center`}
                            >
                                {text} {/* Display the dynamic text */}
                            </ThemedText>
                        </TouchableOpacity>
                    </View>
                </View >
            </TouchableWithoutFeedback>
        </View>
    );
};

export default UploadImageComponent;
