import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.productiva.mente',
  appName: 'productiva-mente',
  webDir: 'dist/productiva-mente/browser',
  plugins: {
    SafeArea: {
      enabled: true,
      customColorsForSystemBars: true,
      statusBarColor: '#fffff8f8',
      statusBarContent: 'dark',
      navigationBarColor: '#00000000',
      navigationBarContent: 'dark',
      offset: 0,
    },
  }
};

export default config;
