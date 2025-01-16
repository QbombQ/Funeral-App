import { Image, StyleSheet, Platform, ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import tw from "twrnc";

export default function Index() {
  return (
    <ThemedView>
      {/* <Animated.ScrollView
        // ref={scrollRef}
        // scrollEventThrottle={16}
        // scrollIndicatorInsets={{ bottom }}
        // contentContainerStyle={{ paddingBottom: bottom }}
        > */}
          {/* <ImageBackground
            source={require('@/assets/images/background.jpg')}
            style={tw`w-full h-full`}
            imageStyle={{resizeMode:"cover"}}
          >

          </ImageBackground> */}
      {/* </Animated.ScrollView> */}
      <ThemedText>
        sdfsdfsdfsdfs
      </ThemedText>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({

});
