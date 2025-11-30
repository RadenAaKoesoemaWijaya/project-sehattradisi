# SehatTradisi - Development Setup

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and configure:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to `http://localhost:5173`

## 🔧 Configuration

### Firebase Setup
1. Create Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Copy credentials to `.env` file

### Midtrans Setup
1. Create Midtrans account at https://midtrans.com
2. Get sandbox credentials
3. Add client key to `.env` file

## 📱 Features

- ✅ Firebase Authentication
- ✅ Real-time Database (Firestore)
- ✅ Payment Gateway (Midtrans)
- ✅ PDF Invoice Generation
- ✅ Mobile Responsive Design
- ✅ Progressive Loading
- ✅ Error Handling

## 🛠️ Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 🚨 Troubleshooting

### Application Not Loading
1. Check environment variables in `.env`
2. Ensure all dependencies installed
3. Check browser console for errors
4. Verify Firebase/Midtrans configuration

### Common Issues
- **Firebase errors**: Check API keys and project settings
- **Payment errors**: Verify Midtrans sandbox credentials
- **Build errors**: Run `npm install` to update dependencies

## 📊 Performance

- Main bundle: 299KB (89% reduction)
- Lazy loading for heavy components
- Progressive loading with proper states
- Optimized for mobile devices

## 🌐 Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Netlify
1. Connect repository
2. Configure build settings
3. Add environment variables

## 📞 Support

For issues and questions:
1. Check console logs
2. Verify configuration
3. Review troubleshooting section
4. Check documentation
