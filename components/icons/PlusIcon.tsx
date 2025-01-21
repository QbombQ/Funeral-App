import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusIcon(props: any) {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <Path d="M12 4V20" stroke="#95989A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M4 12H20" stroke="#95989A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

export default PlusIcon;
