import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ScaleLoader } from 'react-spinners';

import { isWeb } from '@/src/utils';

const LoadingOverlay: React.FC = () => {
  return (
    <View style={styles.overlay}>{isWeb() ? <ScaleLoader color="#ffffff" /> : <ActivityIndicator size="large" color="#ffffff" />}</View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoadingOverlay;
