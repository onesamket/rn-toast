import React from 'react';
import { Button, SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { ToastProvider, useToast } from '../src';

function ToastDemo() {
  const toast = useToast();

  const showDefaultToast = () => {
    toast.toast({
      description: 'This is a default toast notification',
    });
  };

  const showSuccessToast = () => {
    toast.success({
      description: 'Operation completed successfully!',
    });
  };

  const showErrorToast = () => {
    toast.error({
      description: 'An error occurred while processing your request',
    });
  };

  const showWarningToast = () => {
    toast.warning({
      description: 'Warning: Your storage is almost full',
    });
  };

  const showInfoToast = () => {
    toast.info({
      description: 'New message received from John Doe',
    });
  };

  const showLoadingToast = () => {
    const id = toast.loading({
      description: 'Loading your data...',
      duration: 0,
    });

    // Simulate async operation
    setTimeout(() => {
      toast.dismissToast(id);
      toast.success({
        description: 'Data loaded successfully!',
      });
    }, 3000);
  };

  const showPromiseToast = async () => {
    const mockPromise = new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        const success = Math.random() > 0.3;
        if (success) {
          resolve({ data: 'Success data' });
        } else {
          reject(new Error('Failed to fetch data'));
        }
      }, 3000);
    });

    toast.promise(mockPromise, {
      description: 'Fetching data',
      promise: {
        loading: 'Fetching data from server...',
        success: 'Data fetched successfully!',
        error: 'Failed to fetch data',
      },
    }).catch(() => {
      // Error already handled by toast
    });
  };

  const showActionToast = () => {
    toast.info({
      description: 'Your file is ready for download',
      action: {
        label: 'Download',
        onPress: () => {
          toast.success({
            description: 'Download started!',
          });
        },
      },
    });
  };

  const showCustomDurationToast = () => {
    toast.info({
      description: 'This toast will disappear in 10 seconds',
      duration: 10000,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>RN-Toast Demo</Text>
      <Text style={styles.subtitle}>A beautiful toast notification library for React Native</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Default Toast" onPress={showDefaultToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Success Toast" onPress={showSuccessToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Error Toast" onPress={showErrorToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Warning Toast" onPress={showWarningToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Info Toast" onPress={showInfoToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Loading Toast" onPress={showLoadingToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Promise Toast" onPress={showPromiseToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Toast with Action" onPress={showActionToast} />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Custom Duration (10s)" onPress={showCustomDurationToast} />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <SafeAreaView style={styles.safeArea}>
        <ToastDemo />
      </SafeAreaView>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  buttonContainer: {
    marginBottom: 12,
  },
});
