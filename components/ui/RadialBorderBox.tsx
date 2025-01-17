import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Defs, Rect, RadialGradient, Stop } from 'react-native-svg';

interface RadialBorderBoxProps {
  style?: ViewStyle; // Updated to React Native's ViewStyle
}

const RadialBorderBox: React.FC<RadialBorderBoxProps> = ({ style }) => {
  const width = 300;   // Adjust to your desired width
  const height = 200;  // Adjust to your desired height
  const cornerRadius = 24; // Match the corner radius in Figma
  const strokeWidth = 2;

  return (
    <View style={style}>
      <Svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <Defs>
          <RadialGradient
            id="radialGradientStroke"
            cx="50%"
            cy="50%"
            r="50%"
          >
            <Stop offset="0%" stopColor="#4C6FF0" stopOpacity={1} />
            <Stop offset="100%" stopColor="#4C6FF0" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={width - strokeWidth}
          height={height - strokeWidth}
          rx={cornerRadius}
          fill="none"
          stroke="url(#radialGradientStroke)"
          strokeWidth={strokeWidth}
        />
      </Svg>
    </View>
  );
};

export default RadialBorderBox;
