import React, { useState } from 'react';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';

export const getFileComponent = (filePath: string, fileType: string) => {
    const formattedFilePath = filePath.startsWith("file://") ? filePath : `file://${filePath.replace(/\\/g, '/')}`;

    if (fileType.includes('image')) {
        return <Image source={{ uri: formattedFilePath }} style={tw`w-[90%] h-[50%] rounded-lg`} />;
    }

    if (fileType.includes('video')) {
        return <Video source={{ uri: formattedFilePath }} style={tw`w-[90%] h-[50%] rounded-lg`} useNativeControls />;
    }

    if (fileType.includes('pdf')) {
        return <WebView source={{ uri: formattedFilePath }} style={{ flex: 1, width: '100%', height: 400 }} />;
    }

    if (fileType.includes('audio')) {
        return <AudioPlayer audioUri={formattedFilePath} />;
    }

    return <Text style={tw`text-white text-lg`}>Unsupported File Type</Text>;
};

const AudioPlayer = ({ audioUri }: { audioUri: string }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleAudioPlayPause = async () => {
        if (!sound) {
            const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
            setSound(sound);
            await sound.playAsync();
        } else {
            isPlaying ? await sound.pauseAsync() : await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <TouchableOpacity onPress={handleAudioPlayPause} style={tw`p-4 bg-blue-500 rounded-lg`}>
            <Text style={tw`text-white text-lg`}>{isPlaying ? "Pause Audio" : "Play Audio"}</Text>
        </TouchableOpacity>
    );
};
