import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import tw from "twrnc";
import { ThemedText } from '../ThemedText';

type DashBoardCardComponentProps = {
    title: string;
    description: string;
    buttonText: string;
    buttonAction: () => void;
    extraText?: string;
};

const DashBoardCardComponent: React.FC<DashBoardCardComponentProps> = ({
    title,
    description,
    buttonText,
    buttonAction,
    extraText
}) => {
    return (
        <View
            style={tw`w-[170px] h-[178px]`}
        >
            <Image source={require('@/assets/images/dashboardcomponent.png')} style={tw`absolute`} />
            <View
                style={tw`w-full h-full px-[6px] flex flex-col justify-around items-center`}
            >
                <View
                    style={tw`flex flex-col gap-[8px] justify-center items-center`}
                >
                    <ThemedText variant='title16' fontFamily='RalewayBold' textcolor='#FFFFFF' style={{ textAlign: "center" }}>
                        {title}
                    </ThemedText>
                    <ThemedText variant='title14' fontFamily='RalewaySemiBold' textcolor='#BAC1C4' style={{ textAlign: "center" }}>
                        {description}
                    </ThemedText>
                </View>
                <View
                    style={tw`flex flex-col gap-[8px] justify-center items-center`}
                >
                    <TouchableOpacity
                        onPress={buttonAction}
                        style={tw`border border-[#004CFF] rounded-[50px] w-[112px] h-[29px]`}
                    >
                        <Image source={require("@/assets/images/dashboardcombtnback.png")} style={tw`absolute`} />
                        <View
                            style={tw`w-full h-full flex justify-center items-center`}
                        >
                            <ThemedText variant='title12' fontFamily='NunitoMedium' textcolor='#F6FBFD'>
                                {buttonText}
                            </ThemedText>
                        </View>
                    </TouchableOpacity>
                    {
                        extraText&&
                    <ThemedText variant='title10' fontFamily='RalewaySemiBold' textcolor='#BAC1C4' style={{ textAlign: "center" }}>
                        {extraText}
                    </ThemedText>

                    }
                </View>
            </View>
        </View>
    );
};

export default DashBoardCardComponent;
