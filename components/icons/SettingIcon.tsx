import * as React from "react";
import Svg, { Path } from "react-native-svg";

type SettingIconProps = {
    color?: string; // Color prop
};

const SettingIcon: React.FC<SettingIconProps> = ({ color = "#1F1F1F" }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <Path d="M16.5 4.875H12" stroke={color} stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M4.5 4.875H1.5" stroke={color} stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M7.5 7.5C8.94975 7.5 10.125 6.32475 10.125 4.875C10.125 3.42525 8.94975 2.25 7.5 2.25C6.05025 2.25 4.875 3.42525 4.875 4.875C4.875 6.32475 6.05025 7.5 7.5 7.5Z" stroke={color} stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M16.5 13.125H13.5" stroke={color} stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M6 13.125H1.5" stroke={color} stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        <Path d="M10.5 15.75C11.9497 15.75 13.125 14.5747 13.125 13.125C13.125 11.6753 11.9497 10.5 10.5 10.5C9.05025 10.5 7.875 11.6753 7.875 13.125C7.875 14.5747 9.05025 15.75 10.5 15.75Z" stroke={color} stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
);

export default SettingIcon;
