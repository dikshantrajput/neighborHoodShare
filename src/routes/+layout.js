export const ssr = false;

import { inject } from '@vercel/analytics';

inject({ mode: 'production' });