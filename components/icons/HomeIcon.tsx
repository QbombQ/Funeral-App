import * as React from "react";
import Svg, { Path } from "react-native-svg";
type HomeIconProps = {
    color?: string;  // Color prop
};
const HomeIcon: React.FC<HomeIconProps> = ({ color }) => (
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M15 17C14.2005 17.6224 13.1503 18 12 18C10.8498 18 9.79953 17.6224 9 17" stroke={`${color?color:"#BAC1C4"}`} stroke-width="1.5" stroke-linecap="round" />
            <Path d="M2.35139 13.2135C1.99837 10.9162 1.82186 9.76763 2.25617 8.74938C2.69047 7.73112 3.65403 7.03443 5.58114 5.64106L7.02099 4.6C9.41829 2.86667 10.617 2 12 2C13.3831 2 14.5817 2.86667 16.979 4.6L18.4189 5.64106C20.346 7.03443 21.3096 7.73112 21.7439 8.74938C22.1782 9.76763 22.0017 10.9162 21.6486 13.2135L21.3476 15.1724C20.8472 18.4289 20.5969 20.0572 19.429 21.0286C18.2611 22 16.5537 22 13.1388 22H10.8612C7.44634 22 5.73891 22 4.571 21.0286C3.40309 20.0572 3.15287 18.4289 2.65243 15.1724L2.35139 13.2135Z"  stroke={`${color?color:"#BAC1C4"}`} stroke-width="1.5" stroke-linejoin="round" />
        </Svg>
)

export default HomeIcon;
