# Flutter AdMob Integrated App SplashAds
---

## Steps to Run the Project

### 1. Clone the Repository
   - Open your terminal or command prompt.
   - Run:
     git clone https://github.com/yourusername/flutter-admob-app.git
   - Navigate into the project folder:
     cd flutter-admob-app

### 2. Install Project Dependencies
   - Run:
     flutter pub get
   - This will fetch all the required packages and libraries.

### 3. Configure Your AdMob IDs
   - Replace all test AdMob IDs with your production AdMob App ID and Ad Unit IDs.
   - In android/app/src/main/AndroidManifest.xml, add your AdMob App ID inside the <application> tag:
     <meta-data
       android:name="com.google.android.gms.ads.APPLICATION_ID"
       android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
   - Update `lib/ad_helper.dart` with your actual Ad Unit IDs:

     class AdHelper {
       static String get appId => 'ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy';
       static String get interstitialAdUnitId => 'ca-app-pub-xxxxxxxxxxxxxxxx/1111111111';
       static String get nativeAdUnitId => 'ca-app-pub-xxxxxxxxxxxxxxxx/2222222222';
     }


  Important: Always use Google’s test AdMob IDs during development to avoid account suspension.

### 4. Run the App
   - Connect a physical device or start an emulator.
   - Execute:
     flutter run
   - Your app will launch with integrated AdMob ads.
---

## Dependencies and Libraries Used

- google_mobile_ads
  - Official Google Mobile Ads SDK for Flutter.
  - Enables loading and displaying of banner, interstitial, rewarded, and native ads.

- flutter
  - Core Flutter framework for building the app UI.
---

### Additional Tips

- Testing Ads
  - Configure test devices by adding your device ID to the testDeviceIds list in the MobileAds configuration to avoid invalid impressions.
  - Example:

    MobileAds.instance.updateRequestConfiguration(
      RequestConfiguration(testDeviceIds: ['YOUR_DEVICE_ID']),
    );
    

- Error Handling
  - The app includes logic to handle network failures and ad load errors gracefully, ensuring a smooth user experience without crashes or freezes.
---
