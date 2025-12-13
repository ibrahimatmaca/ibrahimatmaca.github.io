import type { VercelRequest, VercelResponse } from '@vercel/node';

interface AppStoreLookupResponse {
  resultCount: number;
  results: Array<{
    screenshotUrls?: string[];
    ipadScreenshotUrls?: string[];
    artworkUrl512?: string;
    artworkUrl100?: string;
    description?: string;
    trackName?: string;
    bundleId?: string;
  }>;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // CORS headers
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  // Only allow GET requests
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { appId, country = 'tr' } = request.query;

    if (!appId || typeof appId !== 'string') {
      response.status(400).json({ 
        error: 'Missing required parameter',
        details: 'appId query parameter is required'
      });
      return;
    }

    // Validate appId is numeric
    if (!/^\d+$/.test(appId)) {
      response.status(400).json({ 
        error: 'Invalid appId format',
        details: 'appId must be a numeric string'
      });
      return;
    }

    // Fetch from iTunes API
    const lookupUrl = `https://itunes.apple.com/lookup?id=${appId}&country=${country}`;
    const fetchResponse = await fetch(lookupUrl);

    if (!fetchResponse.ok) {
      throw new Error(`iTunes API returned ${fetchResponse.status}`);
    }

    const data: AppStoreLookupResponse = await fetchResponse.json();

    if (data.resultCount === 0 || !data.results || data.results.length === 0) {
      // Try fallback to US if country was not 'us'
      if (country !== 'us') {
        const fallbackUrl = `https://itunes.apple.com/lookup?id=${appId}&country=us`;
        const fallbackResponse = await fetch(fallbackUrl);
        
        if (fallbackResponse.ok) {
          const fallbackData: AppStoreLookupResponse = await fallbackResponse.json();
          if (fallbackData.resultCount > 0 && fallbackData.results.length > 0) {
            const app = fallbackData.results[0];
            response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
            response.status(200).json({
              success: true,
              screenshotUrls: app.screenshotUrls || [],
              ipadScreenshotUrls: app.ipadScreenshotUrls || [],
              artworkUrl512: app.artworkUrl512 || app.artworkUrl100 || null,
              description: app.description || null,
              trackName: app.trackName || null,
            });
            return;
          }
        }
      }

      response.status(404).json({ 
        error: 'App not found',
        details: `No app found with id ${appId} in country ${country}`
      });
      return;
    }

    const app = data.results[0];

    // Extract screenshot URLs (prioritize iPhone screenshots, fallback to iPad)
    const screenshotUrls = app.screenshotUrls || app.ipadScreenshotUrls || [];

    // Cache for 1 hour, allow stale for 24 hours
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

    response.status(200).json({
      success: true,
      screenshotUrls,
      ipadScreenshotUrls: app.ipadScreenshotUrls || [],
      artworkUrl512: app.artworkUrl512 || app.artworkUrl100 || null,
      description: app.description || null,
      trackName: app.trackName || null,
    });

  } catch (error: any) {
    console.error('Error fetching App Store data:', error);
    
    response.status(500).json({ 
      error: 'Failed to fetch App Store data',
      details: error.message || 'An unknown error occurred'
    });
  }
}

