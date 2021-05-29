import * as Sentry from '@sentry/node';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Initializing sentry client
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV || 'production',
  release: process.env.VERCEL_GIT_COMMIT_SHA
});

type ApiHandler = (req: VercelRequest, res: VercelResponse) => Promise<any>;

export const withSentryApiHandler = (apiHandler: ApiHandler): ApiHandler => {
  return async (req: VercelRequest, res: VercelResponse) => {
    try {
      return await apiHandler(req, res);
    } catch (error) {
      console.error(error);
      Sentry.captureException(error);
      await Sentry.flush(2000);
      return res.status(500).json({ message: 'Unexpected error, check logs for more info.' });
    }
  };
};
