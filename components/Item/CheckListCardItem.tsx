import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { ThemedText } from '../ThemedText';
import OptionIcon from '../icons/OptionIcon';
import { ThemedCheckBox } from '../input/ThemedCheckBox';
import { router, usePathname } from 'expo-router';
import ShareChecklistModal from '../modal/ShareChecklistModal';
import moment from "moment";
import axiosInstance from '@/context/api';
import Toast from 'react-native-toast-message';

interface ChecklistItem {
  title: string;
  desc: string;
  created: string;
  completed: boolean;
  sharedTo: any;
  id: any;
}

interface CheckListCardItemProps {
  data: ChecklistItem;
  onCheck: () => void;
  onRemove: () => void;
  onRefresh?: () => void;
  openOptionId: string | number | null;
  setOpenOptionId: (id: string | number | null) => void;
}

const CheckListCardItem: React.FC<CheckListCardItemProps> = ({
  data,
  onCheck,
  onRemove,
  onRefresh,
  openOptionId,
  setOpenOptionId,
}) => {
  const [timeAgo, setTimeAgo] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const newTimeAgo = moment(data.created).fromNow();
      setTimeAgo(newTimeAgo);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000); 
    return () => clearInterval(interval);
  }, [data.created]);
  const isOptionOpen = openOptionId === data.id;

  const handleOptionToggle = () => {
    setOpenOptionId(isOptionOpen ? null : data.id);
  };

  const viewChecklist = () => {
    router.push({
      pathname: "/(checklist)/viewchecklist",
      params: {
        id: data.id,
        title: data.title,
        desc: data.desc,
        created: data.created,
        completed: data.completed ? "true" : "false",
      },
    });
  };

  const editChecklist = () => {
    router.push({
      pathname: "/(checklist)/editchecklist",
      params: {
        id: data.id,
        title: data.title,
        desc: data.desc,
        created: data.created,
        completed: data.completed ? "true" : "false",
      },
    });
  };

  const [showShareChecklistModal, setShowShareChecklistModal] = useState(false);
  const toggleShareModal = () => {
    setShowShareChecklistModal(!showShareChecklistModal);
  };

  const confirmShareChecklist = async (shareData: { email: string }) => {
    try {
      await axiosInstance.post("/check-list/share", {
        id: data.id,
        recevierId: shareData.email,
      });
      Toast.show({
        type: "success",
        text1: "Shared",
        text2: "Checklist shared successfully.",
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
  };

  const confirmUnShareChecklist = async (unshareData: { email: string }) => {
    try {
      await axiosInstance.post("/check-list/unshare", {
        id: data.id,
        recevierId: unshareData.email,
      });
      Toast.show({
        type: "success",
        text1: "Unshared",
        text2: "Checklist unshared successfully.",
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
  };

  return (
    <View style={tw`w-full h-[100px] rounded-lg border border-[#004CFF] bg-transparent`}>
      <Image
        source={require('@/assets/images/carditem(chechlist).png')}
        style={tw`absolute w-full h-full rounded-lg`}
      />

      <View style={tw`px-4 py-3 flex flex-row h-full w-full gap-3`}>
        <View style={tw`flex flex-col justify-between flex-grow`}>
          <View style={tw`flex flex-row justify-between`}>
            <ThemedText variant='title16' textcolor='#FFFFFF' fontFamily='RalewayBold'>
              {data.title}
            </ThemedText>
            <TouchableOpacity onPress={handleOptionToggle}>
              <OptionIcon />
            </TouchableOpacity>
          </View>

          {isOptionOpen && (
            <View style={tw`absolute top-[30px] right-[5px] gap-1 z-50 flex items-end`}>
              <Image source={require('@/assets/images/Polygon 2.png')} />
              <View style={tw`w-[111px] border border-[#004CFF] rounded-md`}>
                <Image
                  source={require('@/assets/images/checklistoptionback.png')}
                  style={tw`absolute w-full h-full rounded-md`}
                />
                {pathname === "/shareother" ? (
                  <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={viewChecklist}>
                    <ThemedText variant='title12' textcolor='#F6FBFD'>
                      View
                    </ThemedText>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={editChecklist}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        Edit
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={viewChecklist}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        View
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={tw`px-2 h-6 flex justify-center`}
                      onPress={toggleShareModal}
                    >
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        {pathname === "/shareme" ? "UnShare" : "Share"}
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-2 h-6 flex justify-center`}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        Download
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onRemove} style={tw`px-2 h-6 flex justify-center`}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        Delete
                      </ThemedText>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          )}

          <View style={tw`flex-1 mt-1`}>
            <ThemedText
              variant='title14'
              fontFamily='RaleWaySemiBold'
              textcolor='#BAC1C4'
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {data.desc}
            </ThemedText>
          </View>

          <View style={tw`flex flex-row items-center justify-between mt-1`}>
            <View style={tw`flex flex-row items-center gap-1`}>
              <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                Upload Date:
              </ThemedText>
              <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                {timeAgo}
              </ThemedText>
            </View>

            <View style={tw`flex flex-row items-center gap-2`}>
              <ThemedCheckBox checked={data.completed} onPress={onCheck} size={13} />
              <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                {data.completed ? 'Completed' : 'Completed'}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>

      <ShareChecklistModal
        visible={showShareChecklistModal}
        onClose={toggleShareModal}
        sharedUser={data.sharedTo}
        title={pathname === "/shareme" ? "UnShare Checklist" : "Share Checklist"}
        btntext={pathname === "/shareme" ? "Unshare" : "Share"}
        onCreate={pathname === "/shareme" ? confirmUnShareChecklist : confirmShareChecklist}
      />
    </View>
  );
};

export default CheckListCardItem;
