// import React from 'react';
// import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
// import tw from "twrnc";
// import { ThemedText } from '../ThemedText';
// import MainBackground from '../background/MainBackground';
// import { PrimaryButton } from '../button/PrimaryButton';

// type SuccessModalProps = {
//     visible: boolean;
//     onConfirm: () => void;
//     onCancel: () => void;
//     // title: string;
//     // message?: string;
// };

// const SuccessModal: React.FC<SuccessModalProps> = ({
//     visible,
//     onConfirm,
//     onCancel,
//     // title,
//     // message
// }) => {
//     return (
//         <Modal
//             animationType="fade"
//             transparent={true}
//             visible={visible}
//             statusBarTranslucent={true}
//             style={{zIndex:20}}
//             onRequestClose={onCancel}
//         >
//             <MainBackground title=''>

//                 <TouchableWithoutFeedback onPress={onCancel}>
//                     <View style={tw`flex-1 justify-center items-center w-full h-full`}>
//                         <View
//                             style={tw`w-[340px] h-[370px] flex justify-center items-center`}
//                         >
//                             <Image source={require("@/assets/images/successmodal.png")} style={tw`absolute`} />
//                             <View
//                                 style={tw`w-full h-full py-[16px] flex flex-col justify-between items-center`}
//                             >
//                                 <View
//                                 style={tw`gap-[24px] flex flex-col w-full justify-center items-center`}
//                                 >
//                                     <Image source={require("@/assets/images/Check.png")} />
//                                     <ThemedText variant='title26' fontFamily='RalewayBold' textcolor='#40BF81'>
//                                     Completed!
//                                     </ThemedText>
//                                 </View>
//                                 <PrimaryButton width={230} text='Check File' onPress={onConfirm} />
//                             </View>
//                         </View>
//                     </View>
//                 </TouchableWithoutFeedback>
//             </MainBackground>
//         </Modal>
//     );
// };

// export default SuccessModal;



import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import tw from "twrnc";
import { ThemedText } from '../ThemedText';
import MainBackground from '../background/MainBackground';
import { PrimaryButton } from '../button/PrimaryButton';
import { NormalButton } from '../button/NormalButton';

type SuccessModalProps = {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    statusText:string;
    btnText:string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    statusText,
    btnText
}) => {
    if (!visible) return null; 

    return (
        <View style={tw`absolute top-0 left-0 right-0 bottom-0 w-full h-full z-30`}>
            <MainBackground title=''>
                <TouchableWithoutFeedback onPress={onCancel}>
                    <View style={tw`flex-1 justify-center items-center w-full h-full`}>
                        <View style={tw`w-[340px] h-[370px] flex justify-center items-center`}>
                            <Image source={require("@/assets/images/successmodal.png")} style={tw`absolute`} />
                            <View style={tw`w-full h-full py-[16px] flex flex-col justify-between items-center`}>
                                <View style={tw`gap-[24px] flex flex-col w-full justify-center items-center`}>
                                    <Image source={require("@/assets/images/Check.png")} />
                                    <ThemedText variant='title26' fontFamily='RalewayBold' textcolor='#40BF81'>
                                        {statusText}
                                    </ThemedText>
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

export default SuccessModal;
