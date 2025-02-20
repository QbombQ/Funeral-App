import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import { getSocket } from "@/context/socket";

const SocketListener = () => {
  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      socket.off("shared-checkList");
      socket.off("unshared-checkList");
      socket.off("shared-vault");
      socket.off("unshared-vault");

      socket.on("shared-checkList", (data) => {
        console.log("🔥 Checklist Shared - About to show toast:", data);
        Toast.show({
          type: "success",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          text1: "Checklist Shared 🎉",
          text2: `${data.sharedUser} shared a checklist with you.`,
        });
      });

      socket.on("unshared-checkList", (data) => {
        console.log("🔥 Checklist Unshared - About to show toast:", data);
        Toast.show({
          type: "error",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          text1: "Checklist Unshared",
          text2: `${data.sharedUser} removed you from a checklist.`,
        });
      });

      socket.on("shared-vault", (data) => {
        console.log("🔥 Vault Shared - About to show toast:", data);
        Toast.show({
          type: "success",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          text1: "Vault Shared 🎉",
          text2: `${data.sharedUser} shared a vault with you.`,
        });
      });

      socket.on("unshared-vault", (data) => {
        console.log("🔥 Vault Unshared - About to show toast:", data);
        Toast.show({
          type: "error",
          position: "top",
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          text1: "Vault Unshared",
          text2: `${data.sharedUser} removed you from a vault.`,
        });
      });
    }

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.off("shared-checkList");
        socket.off("unshared-checkList");
        socket.off("shared-vault");
        socket.off("unshared-vault");
      }
    };
  }, []);

  return null;
};

export default SocketListener;