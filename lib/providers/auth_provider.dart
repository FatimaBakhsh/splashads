import 'package:flutter/material.dart';

class AuthProvider extends ChangeNotifier {
  bool _isLoggedIn = false;
  String? _userEmail;
  String? _userName;

  bool get isLoggedIn => _isLoggedIn;
  String? get userEmail => _userEmail;
  String? get userName => _userName;

  void login(String email, String password) {
    // Simulate login process
    _isLoggedIn = true;
    _userEmail = email;
    _userName = email.split('@')[0];
    notifyListeners();
  }

  void logout() {
    _isLoggedIn = false;
    _userEmail = null;
    _userName = null;
    notifyListeners();
  }

  void register(String email, String password, String name) {
    // Simulate registration process
    _isLoggedIn = true;
    _userEmail = email;
    _userName = name;
    notifyListeners();
  }
}
