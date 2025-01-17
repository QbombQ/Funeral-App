import {
    StyleSheet, ImageBackground, View, Image,
    TouchableOpacity
} from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import NextIcon from '@/components/icons/NextIcon';
import tw from "twrnc";
import { router } from 'expo-router';
export default function HomeScreen() {
    const handlePress = () => {
        router.push("/(auth)")
    }

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
                    style={tw`absolute top-0 left-0 z-[20]`}
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
                        <ThemedText type='retitle' textcolor='#E9E9E9' style={tw`text-center`}>
                            Plan Ahead with Ease and Peace of Mind
                        </ThemedText>
                    </View>

                    <View
                        style={tw`w-[340px] text-center`}
                    >
                        <ThemedText type='nutitle' textcolor='#FFFFFF' style={tw`text-center`}>
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
                            {/* <View  style={tw`absolute w-full h-full bg-[#004CFF] opacity-50 rounded-[56px] z-[1]`}/> */}

                            <Image source={require('@/assets/images/logbutton.png')} style={tw`w-full h-full absolute top-0 left-0 z-[2]`} />

                            <ThemedText type='numedium' textcolor='#F6FBFD'>
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