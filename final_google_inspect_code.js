// AI Power Chart - Complete Trading Platform
// Copy and paste this entire code into Google Chrome's Console (F12)

(function() {
    // Clear existing page content
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    
    // Add CSS styles
    const styles = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            overflow-x: hidden;
            min-height: 100vh;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 24px;
            font-weight: bold;
            color: #667eea;
        }

        .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 20px;
        }

        .header-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }

        .btn-primary {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
            background: rgba(102, 126, 234, 0.1);
            color: #667eea;
            border: 1px solid rgba(102, 126, 234, 0.3);
        }

        .btn-secondary:hover {
            background: rgba(102, 126, 234, 0.2);
        }

        .main-layout {
            display: grid;
            grid-template-columns: 300px 1fr 300px;
            gap: 20px;
            height: calc(100vh - 140px);
        }

        .sidebar {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            overflow-y: auto;
        }

        .sidebar-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .market-item {
            display: flex;
            align-items: center;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid transparent;
        }

        .market-item:hover {
            background: rgba(102, 126, 234, 0.1);
            border-color: rgba(102, 126, 234, 0.3);
        }

        .market-item.active {
            background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            border-color: #667eea;
        }

        .market-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            margin-right: 15px;
        }

        .market-info {
            flex: 1;
        }

        .market-symbol {
            font-weight: bold;
            font-size: 16px;
        }

        .market-name {
            font-size: 12px;
            color: #666;
        }

        .market-price {
            text-align: right;
        }

        .price-value {
            font-weight: bold;
            font-size: 16px;
        }

        .price-change {
            font-size: 12px;
            font-weight: 500;
        }

        .price-change.positive {
            color: #10b981;
        }

        .price-change.negative {
            color: #ef4444;
        }

        .chart-area {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
        }

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .chart-title {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .chart-controls {
            display: flex;
            gap: 10px;
        }

        .timeframe-btn {
            padding: 8px 16px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .timeframe-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .chart-container {
            flex: 1;
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }

        .chart-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: #666;
            font-size: 18px;
        }

        .chart-line {
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transform: translateY(-50%);
        }

        .chart-dots {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        .chart-dot {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #667eea;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .trading-controls {
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .order-form {
            background: #f8fafc;
            border-radius: 10px;
            padding: 20px;
            border: 2px solid transparent;
        }

        .order-form.buy {
            border-color: #10b981;
        }

        .order-form.sell {
            border-color: #ef4444;
        }

        .order-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            text-align: center;
        }

        .order-title.buy {
            color: #10b981;
        }

        .order-title.sell {
            color: #ef4444;
        }

        .form-group {
            margin-bottom: 15px;
        }

        .form-label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: #333;
        }

        .form-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            transition: border-color 0.3s ease;
        }

        .form-input:focus {
            outline: none;
            border-color: #667eea;
        }

        .order-btn {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .order-btn.buy {
            background: #10b981;
            color: white;
        }

        .order-btn.buy:hover {
            background: #059669;
            transform: translateY(-2px);
        }

        .order-btn.sell {
            background: #ef4444;
            color: white;
        }

        .order-btn.sell:hover {
            background: #dc2626;
            transform: translateY(-2px);
        }

        .portfolio-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 10px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
        }

        .portfolio-info {
            flex: 1;
        }

        .portfolio-symbol {
            font-weight: bold;
            font-size: 16px;
        }

        .portfolio-amount {
            font-size: 12px;
            color: #666;
        }

        .portfolio-value {
            text-align: right;
        }

        .portfolio-total {
            font-weight: bold;
            font-size: 16px;
        }

        .portfolio-pnl {
            font-size: 12px;
            font-weight: 500;
        }

        .portfolio-pnl.positive {
            color: #10b981;
        }

        .portfolio-pnl.negative {
            color: #ef4444;
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }

        .notification.show {
            transform: translateX(0);
        }

        .notification.success {
            background: #10b981;
        }

        .notification.error {
            background: #ef4444;
        }

        .notification.info {
            background: #667eea;
        }

        @media (max-width: 1200px) {
            .main-layout {
                grid-template-columns: 250px 1fr 250px;
            }
        }

        @media (max-width: 768px) {
            .main-layout {
                grid-template-columns: 1fr;
                grid-template-rows: auto auto auto;
            }
            
            .sidebar {
                order: 3;
            }
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
            animation: fadeIn 0.5s ease-out;
        }
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Add HTML content
    document.body.innerHTML = `
        <div class="container">
            <header class="header fade-in">
                <div class="logo">
                    <div class="logo-icon">📈</div>
                    AI Power Chart
                </div>
                <div class="header-actions">
                    <button class="btn btn-secondary" onclick="window.toggleTheme()">🌙</button>
                    <button class="btn btn-secondary" onclick="window.showNotification('info', 'Notifications coming soon!')">🔔</button>
                    <button class="btn btn-primary" onclick="window.showNotification('success', 'Welcome to AI Power Chart!')">Get Started</button>
                </div>
            </header>

            <div class="main-layout">
                <aside class="sidebar fade-in">
                    <div class="sidebar-title">
                        📊 Markets
                        <button class="btn btn-secondary" onclick="window.refreshPrices()" style="margin-left: auto; padding: 5px 10px; font-size: 12px;">🔄</button>
                    </div>
                    <div id="marketsList"></div>
                </aside>

                <main class="chart-area fade-in">
                    <div class="chart-header">
                        <div class="chart-title" id="chartTitle">BTC/USD Chart</div>
                        <div class="chart-controls">
                            <button class="timeframe-btn active" onclick="window.setTimeframe('1H')">1H</button>
                            <button class="timeframe-btn" onclick="window.setTimeframe('4H')">4H</button>
                            <button class="timeframe-btn" onclick="window.setTimeframe('1D')">1D</button>
                            <button class="timeframe-btn" onclick="window.setTimeframe('1W')">1W</button>
                        </div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-placeholder">
                            <div style="text-align: center;">
                                <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                                <div>AI Power Chart</div>
                                <div style="font-size: 14px; color: #999; margin-top: 10px;">Advanced Trading Analytics</div>
                            </div>
                        </div>
                        <div class="chart-line"></div>
                        <div class="chart-dots" id="chartDots"></div>
                    </div>
                    <div class="trading-controls">
                        <div class="order-form buy">
                            <div class="order-title buy">Buy</div>
                            <div class="form-group">
                                <label class="form-label">Amount</label>
                                <input type="number" class="form-input" id="buyAmount" placeholder="0.00" step="0.01">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Price</label>
                                <input type="number" class="form-input" id="buyPrice" placeholder="0.00" step="0.01">
                            </div>
                            <button class="order-btn buy" onclick="window.placeOrder('buy')">Buy Now</button>
                        </div>
                        <div class="order-form sell">
                            <div class="order-title sell">Sell</div>
                            <div class="form-group">
                                <label class="form-label">Amount</label>
                                <input type="number" class="form-input" id="sellAmount" placeholder="0.00" step="0.01">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Price</label>
                                <input type="number" class="form-input" id="sellPrice" placeholder="0.00" step="0.01">
                            </div>
                            <button class="order-btn sell" onclick="window.placeOrder('sell')">Sell Now</button>
                        </div>
                    </div>
                </main>

                <aside class="sidebar fade-in">
                    <div class="sidebar-title">💼 Portfolio</div>
                    <div style="margin-bottom: 20px; padding: 15px; background: #f8fafc; border-radius: 10px;">
                        <div style="font-size: 12px; color: #666;">Total Balance</div>
                        <div style="font-size: 24px; font-weight: bold; color: #333;" id="totalBalance">$10,000.00</div>
                    </div>
                    <div id="portfolioList"></div>
                </aside>
            </div>
        </div>
    `;

    // Global variables
    window.currentTheme = 'light';
    window.selectedMarket = 'BTC/USD';
    window.currentTimeframe = '1H';
    window.balance = 10000;
    window.portfolio = [
        { symbol: 'BTC/USD', amount: 0.5, avgPrice: 42000, currentPrice: 43250 },
        { symbol: 'ETH/USD', amount: 2.0, avgPrice: 2600, currentPrice: 2650 }
    ];
    window.markets = [
        { symbol: 'BTC/USD', name: 'Bitcoin', price: 43250, change24h: 2.5, volume: 25000000000, icon: '₿', color: '#f7931a' },
        { symbol: 'ETH/USD', name: 'Ethereum', price: 2650, change24h: -1.2, volume: 15000000000, icon: 'Ξ', color: '#627eea' },
        { symbol: 'ADA/USD', name: 'Cardano', price: 0.45, change24h: 5.8, volume: 800000000, icon: '₳', color: '#0033ad' },
        { symbol: 'DOT/USD', name: 'Polkadot', price: 6.8, change24h: -0.8, volume: 500000000, icon: '●', color: '#e6007a' },
        { symbol: 'LINK/USD', name: 'Chainlink', price: 15.2, change24h: 3.1, volume: 1200000000, icon: '🔗', color: '#2a5ada' }
    ];

    // Functions
    window.renderMarkets = function() {
        const marketsList = document.getElementById('marketsList');
        marketsList.innerHTML = '';

        window.markets.forEach(market => {
            const marketItem = document.createElement('div');
            marketItem.className = `market-item ${market.symbol === window.selectedMarket ? 'active' : ''}`;
            marketItem.onclick = () => window.selectMarket(market.symbol);

            marketItem.innerHTML = `
                <div class="market-icon" style="background: ${market.color}">${market.icon}</div>
                <div class="market-info">
                    <div class="market-symbol">${market.symbol}</div>
                    <div class="market-name">${market.name}</div>
                </div>
                <div class="market-price">
                    <div class="price-value">$${market.price.toLocaleString()}</div>
                    <div class="price-change ${market.change24h >= 0 ? 'positive' : 'negative'}">
                        ${market.change24h >= 0 ? '+' : ''}${market.change24h.toFixed(2)}%
                    </div>
                </div>
            `;

            marketsList.appendChild(marketItem);
        });
    };

    window.renderPortfolio = function() {
        const portfolioList = document.getElementById('portfolioList');
        portfolioList.innerHTML = '';

        window.portfolio.forEach(item => {
            const market = window.markets.find(m => m.symbol === item.symbol);
            if (!market) return;

            const currentValue = item.amount * market.price;
            const avgValue = item.amount * item.avgPrice;
            const pnl = currentValue - avgValue;
            const pnlPercent = (pnl / avgValue) * 100;

            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';

            portfolioItem.innerHTML = `
                <div class="portfolio-info">
                    <div class="portfolio-symbol">${item.symbol}</div>
                    <div class="portfolio-amount">${item.amount.toFixed(4)} ${item.symbol.split('/')[0]}</div>
                </div>
                <div class="portfolio-value">
                    <div class="portfolio-total">$${currentValue.toFixed(2)}</div>
                    <div class="portfolio-pnl ${pnl >= 0 ? 'positive' : 'negative'}">
                        ${pnl >= 0 ? '+' : ''}$${pnl.toFixed(2)} (${pnlPercent >= 0 ? '+' : ''}${pnlPercent.toFixed(2)}%)
                    </div>
                </div>
            `;

            portfolioList.appendChild(portfolioItem);
        });

        window.updateTotalBalance();
    };

    window.updateTotalBalance = function() {
        let totalValue = window.balance;
        window.portfolio.forEach(item => {
            const market = window.markets.find(m => m.symbol === item.symbol);
            if (market) {
                totalValue += item.amount * market.price;
            }
        });

        document.getElementById('totalBalance').textContent = `$${totalValue.toLocaleString()}`;
    };

    window.selectMarket = function(symbol) {
        window.selectedMarket = symbol;
        document.getElementById('chartTitle').textContent = `${symbol} Chart`;
        window.renderMarkets();
        window.updateChart();
    };

    window.setTimeframe = function(timeframe) {
        window.currentTimeframe = timeframe;
        
        document.querySelectorAll('.timeframe-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        window.updateChart();
    };

    window.updateChart = function() {
        const chartDots = document.getElementById('chartDots');
        chartDots.innerHTML = '';

        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'chart-dot';
            dot.style.left = `${(i / 19) * 100}%`;
            dot.style.top = `${Math.random() * 80 + 10}%`;
            chartDots.appendChild(dot);
        }
    };

    window.updatePrices = function() {
        window.markets.forEach(market => {
            const change = (Math.random() - 0.5) * 0.02;
            market.price *= (1 + change);
            market.change24h = (Math.random() - 0.5) * 10;
        });

        window.renderMarkets();
        window.renderPortfolio();
    };

    window.refreshPrices = function() {
        window.updatePrices();
        window.showNotification('info', 'Prices refreshed!');
    };

    window.placeOrder = function(type) {
        const amountInput = document.getElementById(`${type}Amount`);
        const priceInput = document.getElementById(`${type}Price`);
        
        const amount = parseFloat(amountInput.value);
        const price = parseFloat(priceInput.value);

        if (!amount || !price) {
            window.showNotification('error', 'Please enter both amount and price');
            return;
        }

        const cost = amount * price;

        if (type === 'buy') {
            if (cost > window.balance) {
                window.showNotification('error', 'Insufficient balance');
                return;
            }
            window.balance -= cost;
            
            const existingItem = window.portfolio.find(item => item.symbol === window.selectedMarket);
            if (existingItem) {
                const totalAmount = existingItem.amount + amount;
                const totalCost = (existingItem.amount * existingItem.avgPrice) + cost;
                existingItem.avgPrice = totalCost / totalAmount;
                existingItem.amount = totalAmount;
            } else {
                window.portfolio.push({
                    symbol: window.selectedMarket,
                    amount: amount,
                    avgPrice: price,
                    currentPrice: price
                });
            }
        } else {
            const existingItem = window.portfolio.find(item => item.symbol === window.selectedMarket);
            if (!existingItem || existingItem.amount < amount) {
                window.showNotification('error', 'Insufficient holdings');
                return;
            }
            
            window.balance += cost;
            existingItem.amount -= amount;
            
            if (existingItem.amount <= 0) {
                window.portfolio = window.portfolio.filter(item => item.symbol !== window.selectedMarket);
            }
        }

        window.renderPortfolio();
        window.showNotification('success', `${type.toUpperCase()} order placed successfully!`);
        
        amountInput.value = '';
        priceInput.value = '';
    };

    window.toggleTheme = function() {
        window.currentTheme = window.currentTheme === 'light' ? 'dark' : 'dark';
        document.body.style.background = window.currentTheme === 'dark' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        
        const themeBtn = event.target;
        themeBtn.textContent = window.currentTheme === 'dark' ? '☀️' : '🌙';
    };

    window.showNotification = function(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

    // Initialize
    window.renderMarkets();
    window.renderPortfolio();
    window.updateChart();
    setInterval(window.updatePrices, 5000);

    console.log('🚀 AI Power Chart Trading Platform loaded successfully!');
    console.log('📊 Features: Real-time trading, Portfolio management, Price charts');
    console.log('💡 Try: Click on markets, place orders, toggle theme');
})(); 