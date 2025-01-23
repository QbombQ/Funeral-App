import React, { useState } from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Switch
} from 'react-native';
import { router } from "expo-router";
import tw from "twrnc";
import MainBackground from '@/components/background/MainBackground';
import NavigationHeader from '@/components/navigation/NavigationHeader';
import MainNavigationBar from '@/components/navigation/MainNavigationBar';
import { ThemedText } from '@/components/ThemedText';
import DashBoardCardComponent from '@/components/ui/DashBoardCardComponent';
export default function Index() {

    const openChecklist = () => {
        console.log("Opening Checklist...");
    };

    const viewVault = () => {
        console.log("Viewing Vault...");
    };

    const trackBudget = () => {
        console.log("Tracking Budget...");
    };

    const exploreMap = () => {
        console.log("Exploring Map...");
    };
    return (
        <></>

    );
}
