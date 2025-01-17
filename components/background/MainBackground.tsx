import { PropsWithChildren } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import tw from "twrnc";

export default function MainBackground({ children, title }: PropsWithChildren & { title: string }) {
    return (
        <SafeAreaView
            style={tw`flex flex-1 bg-black`}
        >
            <View style={tw`absolute w-full h-full`}>
                <Image source={require('@/assets/images/bubble5.png')} style={tw`absolute top-0 left-0 z-[1]`} />
                <Image source={require('@/assets/images/bubble8.png')} style={tw`absolute top-2 right-0 z-[2]`} />
                <Image source={require('@/assets/images/bubble9.png')} style={tw`absolute top-0 right-0 z-[3]`} />
                <Image source={require('@/assets/images/bubble7.png')} style={tw`absolute bottom-0 right-0 z-[3]`} />
                <Image source={require('@/assets/images/bubble6.png')} style={tw`absolute bottom-[70px] left-0 z-[3]`} />
            </View>

            <ScrollView
                contentContainerStyle={tw`flex-grow justify-center`}
                style={tw`w-full h-full`}
            >
                <View style={tw`w-full h-full justify-center`}>
                    {children}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
