# AI Quote Generator App

A React Native application that generates unique, AI-powered inspirational quotes from influential figures.

## Features

- AI-generated quotes from various categories
- Customizable quote styles and tones
- Beautiful quote card designs
- Social media sharing
- Personal quote library
- Daily inspiration notifications

## Tech Stack

- React Native with Expo
- TypeScript
- Supabase for backend
- React Native Paper for UI
- OpenAI API for quote generation

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Supabase account
- OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/quote-generator.git
cd quote-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run on your device or simulator:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Project Structure

```
quote-generator/
├── app/                 # Expo Router pages
├── components/          # Reusable components
├── lib/                # Utility functions and configurations
├── styles/             # Global styles and theme
└── assets/            # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 