import {
    StyleSheet, ImageBackground, View, Image,
    TouchableOpacity
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NextIcon from '@/components/icons/NextIcon';
import tw from "twrnc";
import { router } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
export default function HomeScreen() {
    const { userToken } = useAuth();
    const handlePress = () => {
        router.push("/(auth)")
    }
    useEffect(() => {
        if (userToken) {
            router.replace("/(home)/home"); // Redirect to login if not authenticated
        }
    }, [userToken]);
    return (
        <ThemedView>
            <ImageBackground
                source={require('@/assets/images/background.jpg')}
                style={tw`w-full h-full`}
                imageStyle={{ resizeMode: "cover" }}
            >
                <View
                    style={[tw`absolute w-full h-full bg-black opacity-59`]}
                />
                <Image
                    source={require('@/assets/images/bubble 02.png')}
                    style={tw`absolute top-0 left-0`}
                />
                <Image
                    source={require('@/assets/images/bubble 4.png')}
                    style={tw`absolute bottom-0 right-0 `}
                />
                <View
                    style={tw`flex flex-col h-full pt-[20px] justify-around items-center`}
                >
                    <View
                        style={tw`w-[309px] text-center mt-[-40px]`}
                    >
                        <ThemedText variant='title24' textcolor='#E9E9E9' style={[tw`text-center`, { fontFamily: "RalewayBold" }]}>
                            Plan Ahead with Ease and Peace of Mind
                        </ThemedText>
                    </View>

                    <View
                        style={tw`w-[340px] text-center`}
                    >
                        <ThemedText variant='title20' textcolor='#FFFFFF' style={[tw`text-center`, { fontFamily: "NunitoMedium" }]}>
                            Secure your end-of-life wishes with simple tools
                        </ThemedText>
                    </View>
                    <View
                        style={tw`w-full flex justify-center items-center`}
                    >
                        <TouchableOpacity
                            style={tw`w-[283px] h-[50px] flex flex-row justify-center items-center gap-[12px] border border-[#004CFF] rounded-[56px]`}
                            onPress={handlePress}
                        >

                            <Image source={require('@/assets/images/logbutton.png')} style={tw`w-full h-full absolute top-0 left-0 z-[2]`} />

                            <ThemedText variant='title16' textcolor='#F6FBFD' style={{ fontFamily: "NunitoMedium" }}>
                                Get Started
                            </ThemedText>
                            <NextIcon />
                        </TouchableOpacity>

                    </View>
                </View>

            </ImageBackground>
        </ThemedView>

    );
}

const styles = StyleSheet.create({

});