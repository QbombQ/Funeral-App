import React, { useEffect, useState } from 'react';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';
import { Audio } from 'expo-av';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import tw from 'twrnc';
import PDFReader from 'react-native-pdf';

export const getFileComponent = (filePath: string, fileType: string) => {
    const formattedFilePath = filePath;

    // useEffect(() => {
    //     console.log('getrFileComponent is called:::');

    // }, [])

    if (fileType.includes('image')) {
        return <Image source={{ uri: formattedFilePath }} style={tw`w-[100%] h-full rounded-lg`} />;
    }

    if (fileType.includes('video')) {
        return <Video source={{ uri: formattedFilePath }} style={tw`w-[100%] h-full rounded-lg`} useNativeControls />;
    }

    if (fileType.includes('pdf')) {
        // return <WebView
        //     source={{ uri: "http://172.20.100.19:8000/uploads/1739411056945-206393567.pdf" }}
        //     originWhitelist={['*']}
        //     allowFileAccess={true}
        //     allowUniversalAccessFromFileURLs={true}
        //     style={{width: '100%', height: '100%'}}
        // />;
        // useEffect(() => {
        // console.log('PDFReader is triggered:::');

        // }, [])
        return <View style={{ flex: 1, width: '100%', height: "100%" }}>
            {/* <PDFReader
                trustAllCerts={false}
                source={{ uri: `http://172.20.100.19:8000/uploads/1739411056945-206393567.pdf`, cache: true }}
                onLoadComplete={(a, b) => { console.log('onLoadComplete:::', a, b) }}
                onError={(err) => { console.error('ErrorPDFReader:::', err) }}
            /> */}
            <PDFReader
                trustAllCerts={false}
                source={{
                    uri: formattedFilePath,
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
        </View>;

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
