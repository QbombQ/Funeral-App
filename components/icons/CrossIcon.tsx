import * as React from "react";
import Svg, { Path } from "react-native-svg";
type CrossIconProps = {
    color?: string;  // Color prop
};
const CrossIcon: React.FC<CrossIconProps> = ({ color }) => {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="18px" height="18px">
            <Path fill={`${color?color:"#95989A"}`} d="M21.736,19.64l-2.098,2.096c-0.383,0.386-1.011,0.386-1.396,0l-5.241-5.239L7.76,21.735  c-0.385,0.386-1.014,0.386-1.397-0.002L4.264,19.64c-0.385-0.386-0.385-1.011,0-1.398L9.505,13l-5.24-5.24  c-0.384-0.387-0.384-1.016,0-1.398l2.098-2.097c0.384-0.388,1.013-0.388,1.397,0L13,9.506l5.242-5.241  c0.386-0.388,1.014-0.388,1.396,0l2.098,2.094c0.386,0.386,0.386,1.015,0.001,1.401L16.496,13l5.24,5.241  C22.121,18.629,22.121,19.254,21.736,19.64z" />
        </Svg>
    );
}

export default CrossIcon;
