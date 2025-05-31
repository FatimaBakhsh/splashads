import 'package:flutter/material.dart';
import 'package:google_mobile_ads/google_mobile_ads.dart';

import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'dart:async';

class AdManager {
  static InterstitialAd? _interstitialAd;
  static NativeAd? _nativeAd;

  static bool get isInterstitialAdLoaded => _interstitialAd != null;
  static bool get isNativeAdLoaded => _nativeAd != null;
  static NativeAd? get nativeAd => _nativeAd;

  static Future<void> loadAds() async {
    Completer<void> interstitialCompleter = Completer();
    Completer<void> nativeCompleter = Completer();

    InterstitialAd.load(
      adUnitId: 'ca-app-pub-3940256099942544/1033173712',
      request: AdRequest(),
      adLoadCallback: InterstitialAdLoadCallback(
        onAdLoaded: (ad) {
          _interstitialAd = ad;
          interstitialCompleter.complete();
        },
        onAdFailedToLoad: (error) => interstitialCompleter.complete(),
      ),
    );

    _nativeAd = NativeAd(
      adUnitId: 'ca-app-pub-3940256099942544/2247696110',
      factoryId: 'listTile',
      listener: NativeAdListener(
        onAdLoaded: (_) => nativeCompleter.complete(),
        onAdFailedToLoad: (_, __) {
          _nativeAd = null;
          nativeCompleter.complete();
        },
      ),
      request: AdRequest(),
    );
    _nativeAd!.load();

    await Future.wait([interstitialCompleter.future, nativeCompleter.future]);
  }

  static void showInterstitialAd({required VoidCallback onAdDismissed}) {
    if (_interstitialAd != null) {
      _interstitialAd!.fullScreenContentCallback = FullScreenContentCallback(
        onAdDismissedFullScreenContent: (ad) {
          ad.dispose();
          _interstitialAd = null;
          onAdDismissed();
        },
        onAdFailedToShowFullScreenContent: (ad, error) {
          ad.dispose();
          _interstitialAd = null;
          onAdDismissed();
        },
      );
      _interstitialAd!.show();
    } else {
      onAdDismissed();
    }
  }
}
