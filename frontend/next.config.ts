import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  // Ensure Tailwind can scan all necessary files
 };

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);