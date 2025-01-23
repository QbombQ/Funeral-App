// import React, { useRef, useEffect } from 'react';
// import { Modal, View, Text, Animated, Image } from 'react-native';
// import tw from "twrnc";
// import { ThemedText } from '../ThemedText';

// type UploadingModalProps = {
//     visible: boolean;
//     progress: number; // Upload progress (0-100)
// };

// const UploadingModal: React.FC<UploadingModalProps> = ({ visible, progress }) => {
//     const animatedProgress = useRef(new Animated.Value(0)).current;

//     // Animate progress bar width
//     useEffect(() => {
//         Animated.timing(animatedProgress, {
//             toValue: progress,
//             duration: 500,
//             useNativeDriver: false,
//         }).start();
//     }, [progress]);

//     const progressBarWidth = animatedProgress.interpolate({
//         inputRange: [0, 100],
//         outputRange: ['0%', '100%'],
//     });

//     return (
//         <Modal transparent={true} animationType="fade" visible={visible} statusBarTranslucent={true} style={{zIndex:20}}>
//             <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
//                 <View style={tw`rounded-lg justify-center items-center p-4`}>
//                     <ThemedText variant="title14" textcolor="#BAC1C4" fontFamily='RaleWaySemiBold' style={tw`mb-[8px]`}>
//                         Uploading File...
//                     </ThemedText>

//                     {/* Custom Progress Bar */}
//                     <View style={tw`w-[271px] h-[26px] border border-[#004CFF] rounded-full overflow-hidden flex justify-center`}>
//                         <Animated.View
//                             style={[
//                                 tw`h-full bg-[#004CFF] bg-opacity-50 `,
//                                 { width: progressBarWidth },
//                             ]}
//                         >

//                         </Animated.View>
//                         <ThemedText variant="title14" textcolor="#BAC1C4" fontFamily='RaleWaySemiBold' style={tw`absolute w-full text-center`}>
//                             {progress}%
//                         </ThemedText>
//                         <Image source={require('@/assets/images/uploadingstatusbar.png')} style={tw`absolute w-full h-full`} />
//                     </View>

//                     {/* Progress Text */}
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// export default UploadingModal;


import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Image } from 'react-native';
import tw from "twrnc";
import { ThemedText } from '../ThemedText';

type UploadingModalProps = {
    visible: boolean;
    progress: number; 
};

const UploadingModal: React.FC<UploadingModalProps> = ({ visible, progress }) => {
    const animatedProgress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progress,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    const progressBarWidth = animatedProgress.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    if (!visible) return null; 
    return (
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 z-20`}>
            <View style={tw`rounded-lg justify-center items-center p-4`}>
                <ThemedText variant="title14" textcolor="#BAC1C4" fontFamily='RaleWaySemiBold' style={tw`mb-[8px]`}>
                    Uploading File...
                </ThemedText>

                <View style={tw`w-[271px] h-[26px] border border-[#004CFF] rounded-full overflow-hidden flex justify-center`}>
                    <Animated.View
                        style={[
                            tw`h-full bg-[#004CFF] bg-opacity-50`,
                            { width: progressBarWidth },
                        ]}
                    ></Animated.View>

                    <ThemedText variant="title14" textcolor="#BAC1C4" fontFamily='RaleWaySemiBold' style={tw`absolute w-full text-center`}>
                        {progress}%
                    </ThemedText>

                    <Image source={require('@/assets/images/uploadingstatusbar.png')} style={tw`absolute w-full h-full`} />
                </View>

            </View>
        </View>
    );
};

export default UploadingModal;
