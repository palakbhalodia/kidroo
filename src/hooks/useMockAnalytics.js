import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useMockAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Simulate a page view hit to Google Analytics
    console.log(`[Mock Google Analytics] Page View Tracked: ${location.pathname}${location.search}`);
  }, [location]);

  const trackEvent = (eventName, eventData) => {
    // Simulate an event hit to Google Analytics
    console.log(`[Mock Google Analytics] Event Tracked: ${eventName}`, eventData);
  };

  return { trackEvent };
};
