import 'package:flutter/material.dart';
import 'dart:math';

class TradingPair {
  final String symbol;
  final String name;
  final double price;
  final double change24h;
  final double volume24h;
  final String icon;

  TradingPair({
    required this.symbol,
    required this.name,
    required this.price,
    required this.change24h,
    required this.volume24h,
    required this.icon,
  });
}

class TradingProvider extends ChangeNotifier {
  List<TradingPair> _tradingPairs = [];
  double _balance = 10000.0;
  List<Map<String, dynamic>> _portfolio = [];
  String _selectedPair = 'BTC/USD';

  List<TradingPair> get tradingPairs => _tradingPairs;
  double get balance => _balance;
  List<Map<String, dynamic>> get portfolio => _portfolio;
  String get selectedPair => _selectedPair;

  TradingProvider() {
    _initializeTradingPairs();
    _initializePortfolio();
  }

  void _initializeTradingPairs() {
    _tradingPairs = [
      TradingPair(
        symbol: 'BTC/USD',
        name: 'Bitcoin',
        price: 43250.0,
        change24h: 2.5,
        volume24h: 25000000000,
        icon: '₿',
      ),
      TradingPair(
        symbol: 'ETH/USD',
        name: 'Ethereum',
        price: 2650.0,
        change24h: -1.2,
        volume24h: 15000000000,
        icon: 'Ξ',
      ),
      TradingPair(
        symbol: 'ADA/USD',
        name: 'Cardano',
        price: 0.45,
        change24h: 5.8,
        volume24h: 800000000,
        icon: '₳',
      ),
      TradingPair(
        symbol: 'DOT/USD',
        name: 'Polkadot',
        price: 6.8,
        change24h: -0.8,
        volume24h: 500000000,
        icon: '●',
      ),
      TradingPair(
        symbol: 'LINK/USD',
        name: 'Chainlink',
        price: 15.2,
        change24h: 3.1,
        volume24h: 1200000000,
        icon: '🔗',
      ),
    ];
  }

  void _initializePortfolio() {
    _portfolio = [
      {
        'symbol': 'BTC/USD',
        'amount': 0.5,
        'avgPrice': 42000.0,
        'currentPrice': 43250.0,
      },
      {
        'symbol': 'ETH/USD',
        'amount': 2.0,
        'avgPrice': 2600.0,
        'currentPrice': 2650.0,
      },
    ];
  }

  void setSelectedPair(String pair) {
    _selectedPair = pair;
    notifyListeners();
  }

  void updatePrices() {
    final random = Random();
    for (int i = 0; i < _tradingPairs.length; i++) {
      final pair = _tradingPairs[i];
      final changePercent = (random.nextDouble() - 0.5) * 10; // -5% to +5%
      final newPrice = pair.price * (1 + changePercent / 100);

      _tradingPairs[i] = TradingPair(
        symbol: pair.symbol,
        name: pair.name,
        price: newPrice,
        change24h: changePercent,
        volume24h: pair.volume24h,
        icon: pair.icon,
      );
    }
    notifyListeners();
  }

  void buy(String symbol, double amount, double price) {
    final cost = amount * price;
    if (cost <= _balance) {
      _balance -= cost;

      // Update portfolio
      final existingIndex =
          _portfolio.indexWhere((item) => item['symbol'] == symbol);
      if (existingIndex != -1) {
        final existing = _portfolio[existingIndex];
        final totalAmount = existing['amount'] + amount;
        final totalCost = (existing['amount'] * existing['avgPrice']) + cost;
        final newAvgPrice = totalCost / totalAmount;

        _portfolio[existingIndex] = {
          'symbol': symbol,
          'amount': totalAmount,
          'avgPrice': newAvgPrice,
          'currentPrice': price,
        };
      } else {
        _portfolio.add({
          'symbol': symbol,
          'amount': amount,
          'avgPrice': price,
          'currentPrice': price,
        });
      }
      notifyListeners();
    }
  }

  void sell(String symbol, double amount, double price) {
    final existingIndex =
        _portfolio.indexWhere((item) => item['symbol'] == symbol);
    if (existingIndex != -1) {
      final existing = _portfolio[existingIndex];
      if (existing['amount'] >= amount) {
        final revenue = amount * price;
        _balance += revenue;

        final remainingAmount = existing['amount'] - amount;
        if (remainingAmount > 0) {
          _portfolio[existingIndex] = {
            'symbol': symbol,
            'amount': remainingAmount,
            'avgPrice': existing['avgPrice'],
            'currentPrice': price,
          };
        } else {
          _portfolio.removeAt(existingIndex);
        }
        notifyListeners();
      }
    }
  }

  double getPortfolioValue() {
    double totalValue = _balance;
    for (final item in _portfolio) {
      final pair = _tradingPairs.firstWhere((p) => p.symbol == item['symbol']);
      totalValue += item['amount'] * pair.price;
    }
    return totalValue;
  }
}
