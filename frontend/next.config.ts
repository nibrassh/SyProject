import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
    domains: [
      'images.unsplash.com',
      // Add other domains you use for images here
    ],
  },
 };

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);