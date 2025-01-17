import React from 'react';
import { CheckBox, Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import tw from 'twrnc'; 

type ThemedCheckBoxProps = {
    checked: boolean;
    onPress: () => void;
    checkedColor?: string;
    uncheckedColor?: string;
    size?: number;
};

export function ThemedCheckBox({
    checked,
    onPress,
    checkedColor = '#004CFF',
    uncheckedColor = '#BAC1C4',
    size = 20,
}: ThemedCheckBoxProps) {
    return (
        <CheckBox
            checked={checked}
            onPress={onPress}
            checkedIcon={
                <Icon
                    type="font-awesome"
                    name="dot-circle-o"
                    size={size}
                    color={checkedColor}
                />
            }
            uncheckedIcon={
                <Icon
                    type="font-awesome"
                    name="circle-o"
                    size={size}
                    color={uncheckedColor}
                />
            }
            containerStyle={[styles.container, tw`bg-transparent p-0 m-0 border-0`]}
            wrapperStyle={[styles.wrapper, tw`bg-transparent p-0 m-0`]}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
        borderWidth: 0,
    },
    wrapper: {
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
    },
});
