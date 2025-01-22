import * as React from "react";
import Svg, { Path } from "react-native-svg";

type NotificationProps = {
    color?: string; // Color prop
};

const Notification: React.FC<NotificationProps> = ({ color = "white" }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
        <Path
            d="M1.89744 10.7955C1.73795 11.8103 2.451 12.5146 3.32404 12.8656C6.67111 14.2114 11.3289 14.2114 14.6759 12.8656C15.549 12.5146 16.262 11.8103 16.1026 10.7955C16.0046 10.1719 15.5199 9.65258 15.1608 9.1455C14.6905 8.47313 14.6438 7.73978 14.6437 6.95956C14.6437 3.94433 12.1169 1.5 9 1.5C5.8831 1.5 3.35635 3.94433 3.35635 6.95956C3.35627 7.73978 3.30954 8.47313 2.83921 9.1455C2.48013 9.65258 1.99546 10.1719 1.89744 10.7955Z"
            stroke={color} // Color passed as prop or defaulted to white
            strokeWidth={1.125} // stroke-width as a number
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M6.75 15.75C7.3471 16.2164 8.13562 16.5 9 16.5C9.86438 16.5 10.6529 16.2164 11.25 15.75"
            stroke={color} // Color passed as prop or defaulted to white
            strokeWidth={1.125} // stroke-width as a number
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default Notification;
