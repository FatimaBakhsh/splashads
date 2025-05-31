import 'package:flutter/material.dart';

import '../services/ad_manager.dart';
import '../widgets/native_ad_widget.dart';

class MainScreen extends StatefulWidget {
  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    @override
    void dispose() {
      WidgetsBinding.instance.removeObserver(this);
      super.dispose();
    }
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed &&
        AdManager.isInterstitialAdLoaded &&
        AdManager.isNativeAdLoaded) {
      Future.delayed(Duration(seconds: 2), () {
        AdManager.showInterstitialAd(onAdDismissed: () => setState(() {}));
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Main Screen")),
      body: Column(
        children: [
          Expanded(child: Center(child: Text('Welcome to the App!'))),
          if (AdManager.nativeAd != null)
            NativeAdWidget(ad: AdManager.nativeAd!),
        ],
      ),
    );
  }
}
