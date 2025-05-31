import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';
import '../services/ad_manager.dart';
import '../services/network_util.dart';
import 'main_screen.dart';

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with WidgetsBindingObserver {
  late Future<void> _adLoadFuture;
  bool _isConnected = true;
  bool _adsLoaded = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _checkNetworkAndLoadAds();
  }

  Future<void> _checkNetworkAndLoadAds() async {
    _isConnected = await NetworkUtil.checkConnection();
    if (!_isConnected) {
      print("in check network and load ads");
      await Future.delayed(Duration(seconds: 2));
      print("after delay");
      _navigateToMainScreen();
      return;
    }

    _adLoadFuture = AdManager.loadAds();

    // Wait 4 seconds for animation or up to 8 seconds total
    await Future.delayed(Duration(seconds: 4));
    try {
      await _adLoadFuture.timeout(Duration(seconds: 4));
      _adsLoaded = AdManager.isInterstitialAdLoaded;
      print("Ads loaded: $_adsLoaded");
    } catch (e) {
      print("Ad loading failed: $e");
    }

    if (_adsLoaded) {
      print("Showing interstitial ad");
      AdManager.showInterstitialAd(onAdDismissed: _navigateToMainScreen);
    } else {
      _navigateToMainScreen();
    }
  }

  void _navigateToMainScreen() {
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => MainScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Lottie.asset('assets/animation.json'),
        /*child: Lottie.asset(
          'assets/animation.json',
          width: 200,
          height: 200,
          repeat: false,
        ),*/
      ),
    );
  }
}
