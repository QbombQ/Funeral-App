// PaymentModal.js
import React, { useState, useRef, useEffect } from 'react';
import { Modal, View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import tw from 'twrnc';

const PaymentModal = ({ visible, approvalUrl, onSuccess, onCancel }:any) => {
  const [loading, setLoading] = useState(true);

  const SUCCESS_URL = '';
  const CANCEL_URL = '';

  const onNavigationStateChange = (navState: { url: any; }) => {
    const { url } = navState;
    if (url.startsWith(SUCCESS_URL)) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const orderID = urlParams.get('token');
      if (orderID) {
        onSuccess(orderID);
      }
    }
    if (url.startsWith(CANCEL_URL)) {
      onCancel();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent={true}>
      <View style={styles.container}>
        {loading && (
          <ActivityIndicator size="large" style={styles.loading} />
        )}
        <WebView
          source={{ uri: approvalUrl }}
          onLoadEnd={() => setLoading(false)}
          onNavigationStateChange={onNavigationStateChange}
          style={styles.webview}
        />
        <TouchableOpacity onPress={onCancel} style={tw`p-4 bg-red-500 rounded m-4`}>
          <Text style={tw`text-white text-center`}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PaymentModal;

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  loading: { position: 'absolute', top: '50%', left: '50%', zIndex: 1 },
});
