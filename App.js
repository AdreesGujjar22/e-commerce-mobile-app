import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Platform,
  StatusBar,
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";

const APP_URL = process.env.EXPO_PUBLIC_APP_URL || "https://shopify.com";

export default function App() {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Use a ref to store the real-time back status, bypassing stale state closures
  const canGoBackRef = useRef(false);

  // Keep the ref strictly synchronized whenever state variables update
  useEffect(() => {
    canGoBackRef.current = canGoBack;
  }, [canGoBack]);

  // 1. Monitor Internet Connectivity Changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected !== false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fixed Android Hardware Back Button Hook Matrix
  useEffect(() => {
    const handleBackPress = () => {
      // Check the live ref state instead of the frozen closure variable
      if (canGoBackRef.current && webViewRef.current) {
        webViewRef.current.goBack();
        return true; // Keeps the app open and navigates back in WebView history
      }
      return false; // Safely exits the app if no history remains
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []); // Empty dependency array keeps this listener registered exactly once

  // 3. Retry Button Trigger action
  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      setIsConnected(true);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const IndicatorLoadingView = () => (
    <ActivityIndicator
      color="#000000"
      size="large"
      style={styles.indicatorStyle}
    />
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#FFFFFF"
      />
      <View style={styles.androidStatusBarSpacer} />

      {isConnected ? (
        <WebView
          key={refreshKey}
          ref={webViewRef}
          style={styles.webViewContainer}
          source={{ uri: APP_URL }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={IndicatorLoadingView}
          startInLoadingState={true}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
          // Safety net if the WebView fails to resolve DNS paths internally
          onReceivedError={() => setIsConnected(false)}
        />
      ) : (
        /* Minimalist Neutral Theme Offline Page Screen Mapping Blueprint */
        <View style={styles.offlineContainer}>
          {/* Pulls your existing local adaptive app logo asset smoothly */}
          <Image
            source={require("./assets/splash-icon.png")}
            style={[styles.appIcon, { tintColor: "#000000", opacity: 1 }]}
            resizeMode="contain"
          />

          <Text style={styles.offlineTitle}>You are offline</Text>
          <Text style={styles.offlineSubtitle}>
            Please check your connection and try again.
          </Text>

          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  androidStatusBarSpacer: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FFFFFF",
  },
  webViewContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  indicatorStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4F4",
  },
  /* Offline UI Theme Layout Blocks */
  offlineContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Premium pure white background canvas
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  appIcon: {
    width: 150,
    height: 150,
    marginBottom: 24,
    alignSelf: "center",
  },
  offlineTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000000", // Sharp Shopify-style solid black header text
    marginBottom: 8,
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif-medium",
  },
  offlineSubtitle: {
    fontSize: 14,
    color: "#666666", // Subtle neutral grey font body text color
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: "#000000", // Solid black call-to-action block button
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 4, // Clean minimal square corner curvature feel
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  retryButtonText: {
    color: "#FFFFFF", // High-contrast clean white primary button text typography
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
