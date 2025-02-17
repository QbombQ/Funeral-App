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
  userId: string;
  id: any;
}

interface CheckListCardItemProps {
  data: ChecklistItem;
  onCheck: () => void;
  onRemove: () => void;
  onRefresh?: () => void;
  openOptionId: string | number | null;
  setOpenOptionId: (id: string | number | null) => void;
  setLoading?: (loading: boolean) => void;
}

const CheckListCardItem: React.FC<CheckListCardItemProps> = ({
  data,
  onCheck,
  onRemove,
  onRefresh,
  openOptionId,
  setOpenOptionId,
  setLoading
}) => {
  const [timeAgo, setTimeAgo] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const createdMoment = moment.utc(data.created); // Parse timestamp as UTC
      const now = moment.utc(); // Get current UTC time
  
      // Prevent negative values
      if (now.isBefore(createdMoment)) {
        setTimeAgo("Just now");
        return;
      }
  
      if (now.diff(createdMoment, 'days') >= 7) {
        setTimeAgo(createdMoment.local().format("MMM DD, YYYY"));
      } else {
        setTimeAgo(createdMoment.local().fromNow(true) + " ago"); // `fromNow(true)` removes "ago", so we append it manually
      }
    };
  
    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every 60 seconds for performance
    return () => clearInterval(interval);
  }, [data.created]);
  
  
  const isOptionOpen = openOptionId === data.id;

  const handleOptionToggle = () => {
    setOpenOptionId(isOptionOpen ? null : data.id);
  };

  const viewChecklist = () => {
    router.push({
      pathname: "/(home)/(checklist)/viewchecklist",
      params: {
        id: data.id,
        title: data.title,
        desc: data.desc,
        created: data.created,
        sharedTo: data.sharedTo,
        completed: data.completed ? "true" : "false",
      },
    });
  };

  const editChecklist = () => {
    router.push({
      pathname: "/(home)/(checklist)/editchecklist",
      params: {
        id: data.id,
        title: data.title,
        desc: data.desc,
        created: data.created,
        sharedTo: data.sharedTo,
        completed: data.completed ? "true" : "false",
      },
    });
  };

  const [showShareChecklistModal, setShowShareChecklistModal] = useState(false);
  const toggleShareModal = () => {
    setShowShareChecklistModal(!showShareChecklistModal);
  };

  const confirmShareChecklist = async (shareData: { email: string }) => {
    setLoading?.(true)
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
      setLoading?.(false)
      onRefresh && onRefresh();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to share checklist.",
      });
      setLoading?.(false)
    }
  };

  const confirmUnShareChecklist = async (unshareData: { email: string }) => {
    setLoading?.(true)
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
      setLoading?.(false)
      onRefresh && onRefresh();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to unshare checklist.",
      });
      setLoading?.(false)
    }
  };
  const emails: string[] = Array.isArray(data.sharedTo) ? data.sharedTo : (data.sharedTo || "");

  return (
    <View style={tw`w-full ${pathname === "/shareme" ? `h-[110px]` : pathname === "/shareother" ? `h-[110px]` : `h-[95px]`} rounded-lg border border-[#004CFF] bg-transparent`}>
      <Image
        source={require('@/assets/images/carditem(chechlist).png')}
        style={tw`absolute w-full h-full rounded-lg`}
      />

      <View style={tw`px-4 py-2 flex flex-row h-full w-full gap-3`}>
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
                    <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={viewChecklist}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        View
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`px-2 h-6 flex justify-center`} onPress={editChecklist}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        Edit
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
                    {/* <TouchableOpacity style={tw`px-2 h-6 flex justify-center`}>
                      <ThemedText variant='title12' textcolor='#F6FBFD'>
                        Download
                      </ThemedText>
                    </TouchableOpacity> */}
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
          {
            pathname == "/shareme" &&
            <View style={tw`flex-1 mt-1`}>
              <ThemedText
                variant='title12'
                fontFamily='RaleWaySemiBold'
                textcolor='#BAC1C4'
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                SharedTo : {emails.join(", ")}
              </ThemedText>
            </View>

          }
          {
            pathname == "/shareother" &&
            <View style={tw`flex-1 mt-1`}>
              <ThemedText
                variant='title12'
                fontFamily='RaleWaySemiBold'
                textcolor='#BAC1C4'
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                SharedFrom : {data.userId}
              </ThemedText>
            </View>

          }

          <View style={tw`flex flex-row items-center justify-between mt-1`}>
            <View style={tw`flex flex-row items-center gap-1`}>
              <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                Upload Date :
              </ThemedText>
              <ThemedText variant='title14' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                {timeAgo}
              </ThemedText>
            </View>
            {
              pathname == "/shareother"&&
            <View style={tw`flex flex-row items-center gap-2`}>
              <ThemedCheckBox checked={data.completed} onPress={onCheck} size={13} />
              <ThemedText variant='title12' fontFamily='RaleWaySemiBold' textcolor='#BAC1C4'>
                {data.completed ? 'Completed' : 'Completed'}
              </ThemedText>
            </View>
              
            }
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
