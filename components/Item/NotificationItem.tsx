import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import moment from 'moment';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import OptionIcon from '@/components/icons/OptionIcon';
import VaultCardIcon from '@/components/icons/VaultCardIcon';
import { router, usePathname } from 'expo-router';
import ShareChecklistModal from '../modal/ShareChecklistModal';
import axiosInstance from '@/context/api';
import Toast from 'react-native-toast-message';
interface VaultCardProps {
  item: {
    // id: string,
    id:number
    title: string,
    // desc: string,
    // filePath: string,
    // fileType: string,
    // sharedTo: any,
    // created: number,
    // userId:string
    uploadDate:string
  };
  onDelete: () => void;
  onRefresh?: () => void;
  openOptionId: string | number | null;
  setOpenOptionId: (id: string | number | null) => void;
}

const VaultCard: React.FC<VaultCardProps> = ({ item, onDelete, onRefresh, openOptionId, setOpenOptionId }) => {
  const pathname = usePathname();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [timeAgo, setTimeAgo] = useState("");
  const [showShareVaultModal, setShowShareVaultModal] = useState(false)
  const toggleShareModal = () => {
    setShowShareVaultModal(!showShareVaultModal);
  };
  const isOptionOpen = openOptionId === item.id;

  const handleOptionToggle = () => {
    setOpenOptionId(isOptionOpen ? null : item.id);
  };

//   useEffect(() => {
//     const updateTime = () => {
//       const newTimeAgo = moment(item.created).fromNow();
//       setTimeAgo(newTimeAgo);
//     };
//     updateTime();
//     const interval = setInterval(updateTime, 1000);
//     return () => clearInterval(interval);
//   }, [item.created]);
  // const handleOptionToggle = () => {
  //   setShowOptions(!showOptions);
  // };
  const toViewVault = () => {

    router.push({
      pathname: "/(home)/(vault)/viewvault",
      params: {
        id: item.id
      }
    })
  }
  const toEditVault = () => {
    router.push({
      pathname: '/(home)/(vault)/editvault',
      params: {
        id: item.id
      }
    })
  }
  const confirmShareVault = async (shareData: { email: string }) => {
    try {
      await axiosInstance.post("/vault/share", {
        id: item.id,
        recevierId: shareData.email,
      });
      Toast.show({
        type: "success",
        text1: "Shared",
        text2: "Vault shared successfully.",
      });
      onRefresh && onRefresh();
    } catch (error) {
      console.error("Error sharing checklist", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to share checklist.",
      });
    }
  }
  const confirmUnShareVault = async (unshareData: { email: string }) => {
    try {
      await axiosInstance.post("/vault/unshare", {
        id: item.id,
        recevierId: unshareData.email,
      });
      Toast.show({
        type: "success",
        text1: "Unshared",
        text2: "Vault unshared successfully.",
      });
      onRefresh && onRefresh();
    } catch (error) {
      console.error("Error unsharing checklist", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to unshare checklist.",
      });
    }
  }
  return (
    <>
      {/* <TouchableOpacity
      onPress={toViewVault}
      activeOpacity={1}
    // onStartShouldSetResponderCapture={() => showOptions} // Prevent closing when options are open
    > */}
      <View style={tw`w-full ${pathname==="/shareme"?`h-[85px]`:pathname==="/shareother"?`h-[85px]`:`h-[71.62px]`} items-center border border-[#004CFF] rounded-lg`}>
        <Image source={require('@/assets/images/vaultCardBack.png')} style={tw`absolute w-full h-full rounded-lg`} />
        <View style={tw`w-full h-full justify-between items-center flex flex-row px-[8px]`}>
          <View style={tw`flex flex-row gap-[10px] items-center`}>
            <VaultCardIcon />
            <View style={tw`flex flex-col gap-[7px]`}>
              <ThemedText variant="title16" textcolor="#FFFFFF" fontFamily="RaleWayBold">{item.title}</ThemedText>
              <ThemedText variant="title14" textcolor="#BAC1C4" fontFamily="RaleWaySemiBold">{`Upload Date: ${item.uploadDate}`}</ThemedText>
            </View>
          </View>
          {/* Options Button */}
          <TouchableOpacity onPress={handleOptionToggle}>
            <OptionIcon />
          </TouchableOpacity>
        </View>

        {/* Options Menu */}
        {isOptionOpen && (
          // <TouchableOpacity activeOpacity={1} onPress={() => { }} style={tw`absolute bottom-[-95px] right-[12px] justify-end items-end gap-1`}>
          <View style={tw`absolute top-[50px] right-[12px] justify-end items-end gap-1 z-2`}>
            <Image source={require('@/assets/images/Polygon 2.png')} />
            <View style={tw`w-[111px] border border-[#004CFF] rounded-[4px] justify-between`}>
              <Image source={require("@/assets/images/checklistoptionback.png")} style={tw`w-full h-full absolute`} />
              {
                pathname == "/shareother" ?
                  <>
                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={toViewVault}>
                      <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                        View
                      </ThemedText>
                    </TouchableOpacity>
                  </> :
                  <>
                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={toViewVault}>
                      <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                        View
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={toEditVault}>
                      <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                        Edit
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={toggleShareModal}>
                      <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                        {pathname == "/shareme" ? "UnShare" : "Share"}
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-[8px] h-[26px] w-full flex justify-center`} onPress={onDelete}>
                      <ThemedText variant="title12" textcolor="#F6FBFD" fontFamily="NunitoMedium">
                        Delete
                      </ThemedText>
                    </TouchableOpacity>
                  </>
              }
            </View>
          </View>
        )}
      </View>
      {/* </TouchableOpacity> */}
      <ShareChecklistModal
        visible={showShareVaultModal}
        onClose={toggleShareModal}
        // sharedUser={item.sharedTo}
        title={pathname === "/shareme" ? "UnShare Vault" : "Share Vault"}
        btntext={pathname === "/shareme" ? "Unshare" : "Share"}
        onCreate={pathname === "/shareme" ? confirmUnShareVault : confirmShareVault}
      />
    </>

  );
};

export default VaultCard;
