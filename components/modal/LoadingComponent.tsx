// Using react-native-loading-spinner-overlay
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import tw from 'twrnc';
const LoadingComponent = () => {
    const [loading, setLoading] = useState(true);

    //   useEffect(() => {
    //     // Simulate an asynchronous operation
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 2000);
    //   }, []);

    return (
        <View style={tw`absolute w-full h-full top-0 left-0 bg-black bg-opacity-10`}>
            <ActivityIndicator size="large" color="#004CFF" />
        </View>
    );
};


export default LoadingComponent;