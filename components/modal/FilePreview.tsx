import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    Modal,
    Platform
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';
import tw from "twrnc";
import CrossIcon from '../icons/CrossIcon';
import PDFReader from 'react-native-pdf';
import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';
import { ThemedText } from '../ThemedText';

interface FilePreviewProps {
    fileUri: string;
    fileType: string;
    fileName?: string;
    onClose: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUri, fileType, fileName, onClose }) => {
    console.log(fileUri, fileType);

    const fileCategory = getFileType(fileType);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [pdfUri, setPdfUri] = useState<string | null>(null);

    useEffect(() => {
        if (fileCategory === 'pdf') {
            loadPdfForWebView(fileUri);
        }
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [fileUri]);

    const loadPdfForWebView = async (uri: string) => {
        const newUri = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.copyAsync({ from: uri, to: newUri });
        setPdfUri(newUri);
    };

    const handleAudioPlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        } else {
            const { sound } = await Audio.Sound.createAsync(
                { uri: fileUri },
                { shouldPlay: true }
            );
            setSound(sound);
            setIsPlaying(true);
        }
    };

    const openFileExternally = async () => {
        if (Platform.OS === 'android') {
            const uri = await FileSystem.getContentUriAsync(fileUri);
            IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                data: uri,
                flags: 1,
            });
        } else {
            Linking.openURL(fileUri);
        }
    };
    useEffect(() => {
        if (fileCategory === 'video') {
            Orientation.lockToLandscape();
        }

        return () => {
            Orientation.lockToPortrait();
        };
    }, [fileCategory]);
    // const handleClose = () => {
    //     Orientation.lockToPortrait();
    //     onClose();
    // };
    const handleClose = () => {
        console.log("Closing modal...");
        Orientation.lockToPortrait();
        setTimeout(() => {
            console.log("Executing onClose...");
            onClose();
        }, 200);
    };
    ``
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <View style={tw`w-full h-full flex-1 bg-black bg-opacity-50 bg-white justify-center items-center`}>
                <View style={[tw`absolute top-15 right-7 z-50`]}>
                    <TouchableOpacity style={tw`p-2 bg-white rounded-full`} onPress={handleClose}>
                        <CrossIcon color='#000008' />
                    </TouchableOpacity>
                </View>

                <View
                    style={tw`flex-1 items-center w-full h-full justify-center`}
                >

                    {fileCategory === 'image' && (
                        <Image source={{ uri: fileUri }} style={tw`w-[90%] h-[60%] rounded-lg`} />
                    )}

                    {fileCategory === 'video' && (
                        <Video
                            source={{ uri: fileUri }}
                            style={tw`w-full h-full rounded-lg`}
                            useNativeControls
                            resizeMode={"contain" as unknown as ResizeMode}
                        />
                    )}

                    {fileCategory === 'pdf' && fileUri ? (
                        <>
                        <View style={{ flex: 1, width: '100%', height: "100%" }}>
                            <PDFReader
                                trustAllCerts={false}
                                source={{
                                    uri: fileUri,
                                    cache: true,
                                }}
                                onLoadComplete={(numberOfPages, filePath) => {
                                    console.log(`Number of pages: ${numberOfPages}, filePath: ${filePath}`);
                                }}
                                onPageChanged={(page, numberOfPages) => {
                                    console.log(`Current page: ${page}`);
                                }}
                                onError={error => {
                                    console.log('Error PDFReader:::', error);
                                }}
                                onPressLink={uri => {
                                    console.log(`Link pressed: ${uri}`);
                                }}
                                style={tw`w-full h-full rounded-lg`}
                            />
                        </View>
                        </>
                    ) : fileCategory === 'pdf' ? (
                        <Text style={tw`text-white text-lg`}>Loading PDF...</Text>
                    ) : null}

                    {fileCategory === 'audio' && (
                        <View style={tw`items-center justify-center`}>
                            <Text style={tw`text-white text-lg mb-4`}>Playing: {fileName}</Text>
                            <TouchableOpacity
                                style={tw`p-4 bg-blue-500 rounded-lg`}
                                onPress={handleAudioPlayPause}
                            >
                                <Text style={tw`text-white text-lg`}>
                                    {isPlaying ? "Pause Audio" : "Play Audio"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {fileCategory === 'other' && (
                        <TouchableOpacity onPress={openFileExternally} style={tw`p-4 bg-blue-500 rounded-lg`}>
                            <Text style={tw`text-white text-lg`}>Open {fileName}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const getFileType = (fileType: string) => {
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('video')) return 'video';
    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('audio')) return 'audio';
    return 'other';
};

export default FilePreview;
