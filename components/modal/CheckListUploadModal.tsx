// import React from 'react';
// import {
//     Modal,
//     View,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     ActivityIndicator,
// } from 'react-native';
// import tw from "twrnc";
// import UploadBigIcon from '../icons/UploadBigIcon';
// import CreateNewIcon from '../icons/CreateNewIcon';
// import { ThemedText } from '../ThemedText';

// type CheckListUploadModalProps = {
//     visible: boolean;
//     onClose: () => void;
//     onCreateChecklist: () => void;
//     onUpload: () => void; // New function to trigger the upload logic
//     isLoading: boolean; // Pass loading state from parent
// };

// const CheckListUploadModal: React.FC<CheckListUploadModalProps> = ({
//     visible,
//     onClose,
//     onCreateChecklist,
//     onUpload,
//     isLoading,
// }) => {
//     return (
//         <Modal
//             animationType="fade"
//             transparent={true}
//             visible={visible}
//             statusBarTranslucent={true}
//             onRequestClose={onClose}
//             style={{zIndex:20}}
//         >
//             <TouchableWithoutFeedback onPress={onClose}>
//                 <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
//                     <View
//                         style={tw`w-[300px] h-[200px] rounded-lg flex flex-row justify-around items-center bg-[#1A243D] `}
//                     >
//                         {/* Upload Button */}
//                         <TouchableOpacity
//                             style={tw`flex justify-center items-center w-[120px] h-[120px] rounded-lg gap-[11px]`}
//                             onPress={onUpload} // Trigger upload logic
//                             disabled={isLoading} // Disable button while loading
//                         >
//                             <View
//                                 style={tw`w-[53px] h-[53px] border rounded-[5px] border-[#59606E] flex justify-center items-center`}
//                             >
//                                 <UploadBigIcon />
//                             </View>
//                             <ThemedText
//                                 variant="title14"
//                                 textcolor={isLoading ? '#A9A9A9' : '#C2C2C2'}
//                                 fontFamily="PoppinsMedium"
//                                 style={tw`text-center`}
//                             >
//                                 {isLoading ? 'Uploading...' : 'Upload from Device'}
//                             </ThemedText>
//                         </TouchableOpacity>

//                         {/* Create Checklist Button */}
//                         <TouchableOpacity
//                             style={tw`flex justify-center items-center w-[120px] h-[120px] rounded-lg gap-[11px]`}
//                             onPress={() => {
//                                 onCreateChecklist();
//                                 onClose();
//                             }}
//                             disabled={isLoading} // Disable button while loading
//                         >
//                             <View
//                                 style={tw`w-[53px] h-[53px] border rounded-[5px] border-[#59606E] flex justify-center items-center`}
//                             >
//                                 <CreateNewIcon />
//                             </View>
//                             <ThemedText
//                                 variant="title14"
//                                 textcolor="#C2C2C2"
//                                 fontFamily="PoppinsMedium"
//                             >
//                                 Create Checklist
//                             </ThemedText>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </TouchableWithoutFeedback>

//             {/* {isLoading && (
//                 <Modal transparent={true} animationType="fade" visible={isLoading}>
//                     <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
//                         <View style={tw`w-[200px] h-[100px] bg-white rounded-lg justify-center items-center`}>
//                             <ActivityIndicator size="large" color="#004CFF" />
//                             <ThemedText variant="title14" textcolor="#004CFF" style={tw`mt-2`}>
//                                 Uploading File...
//                             </ThemedText>
//                         </View>
//                     </View>
//                 </Modal>
//             )} */}
//         </Modal>
//     );
// };

// export default CheckListUploadModal;



import React from 'react';
import {
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from 'react-native';
import tw from "twrnc";
import UploadBigIcon from '../icons/UploadBigIcon';
import CreateNewIcon from '../icons/CreateNewIcon';
import { ThemedText } from '../ThemedText';

type CheckListUploadModalProps = {
    visible: boolean;
    onClose: () => void;
    onCreateChecklist: () => void;
    onUpload: () => void; 
    isLoading: boolean; 
};

const CheckListUploadModal: React.FC<CheckListUploadModalProps> = ({
    visible,
    onClose,
    onCreateChecklist,
    onUpload,
    isLoading,
}) => {
    if (!visible) return null;

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 absolute w-full h-full`}>
                <View style={tw`w-[300px] h-[200px] rounded-lg flex flex-row justify-around items-center bg-[#1A243D]`}>
                    <TouchableOpacity
                        style={tw`flex justify-center items-center w-[120px] h-[120px] rounded-lg gap-[11px]`}
                        onPress={onUpload} 
                        disabled={isLoading} 
                    >
                        <View style={tw`w-[53px] h-[53px] border rounded-[5px] border-[#59606E] flex justify-center items-center`}>
                            <UploadBigIcon />
                        </View>
                        <ThemedText
                            variant="title14"
                            textcolor={isLoading ? '#A9A9A9' : '#C2C2C2'}
                            fontFamily="PoppinsMedium"
                            style={tw`text-center`}
                        >
                           Upload From Device
                        </ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={tw`flex justify-center items-center w-[120px] h-[120px] rounded-lg gap-[11px]`}
                        onPress={() => {
                            onCreateChecklist();
                            onClose();
                        }}
                        disabled={isLoading} 
                    >
                        <View style={tw`w-[53px] h-[53px] border rounded-[5px] border-[#59606E] flex justify-center items-center`}>
                            <CreateNewIcon />
                        </View>
                        <ThemedText
                            variant="title14"
                            textcolor="#C2C2C2"
                            fontFamily="PoppinsMedium"
                        >
                            Create Checklist
                        </ThemedText>
                    </TouchableOpacity>
                </View>


            </View>
        </TouchableWithoutFeedback>
    );
};

export default CheckListUploadModal;
