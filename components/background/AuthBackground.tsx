import { PropsWithChildren } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import tw from "twrnc";

export default function AuthBackground({ children, title }: PropsWithChildren & { title: string }) {
    return (
        <View style={tw`w-full h-full bg-black`}>
            <Image
                source={require('@/assets/images/bubble2.png')}
                style={tw`absolute top-0 left-0`}
            />
            {/* <ImageBackground
                source={require('@/assets/images/authbackground.png')}
                style={tw`w-full h-full absolute`}
                imageStyle={{ resizeMode: "cover" }}
            /> */}
            <Image
                source={require('@/assets/images/Ellipse 31.png')}
                style={tw`absolute right-[10px]`}
            />
            <Image
                source={require('@/assets/images/bubble1.png')}
                style={tw`absolute bottom-0 right-0`}
            />
            <View style={tw`flex-1`}>{children}</View>
        </View>
    );
}
