import React from 'react';
import {
  Pressable,
  SafeAreaView,
  View,
  Button,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc'; 

const Switch = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = { on: '#004CFF', off: '#BAC1C4' },
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - height.value]
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[
          tw`items-start h-[40px] py-[1.97px] px-[1.79px]`,
          style,
          trackAnimatedStyle,
        ]}
      >
        <Animated.View
          style={[
            tw`h-[13px] w-[13px] bg-white`,
            thumbAnimatedStyle,
            { aspectRatio: 1 }, 
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

export default function App() {
  const isOn = useSharedValue(false);

  const handlePress = () => {
    isOn.value = !isOn.value;
  };

  return (
    <SafeAreaView style={tw`h-[17px] items-center justify-center`}>
      <Switch value={isOn} onPress={handlePress} style={tw`w-[34px] h-[17px]`} />
    </SafeAreaView>
  );
}
