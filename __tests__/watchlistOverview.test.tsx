import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Page from '../src/app/watchlist/page';
import { AppContextComponent } from '../src/app/components/Layout/AppContextComponent';

jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    data: [
      { id: 1, type: 'anime', streamName: 'Anime-1', name: 'Anime 1', poster:'http://placeholder.png', backdrop: 'http://placeholder.png', online_available: true },
      { id: 1, type: 'anime', streamName: 'Anime-2', name: 'Anime 2', poster:'http://placeholder.png', backdrop: 'http://placeholder.png', online_available: true },
      { id: 1, type: 'anime', streamName: 'Anime-3', name: 'Anime 3', poster:'http://placeholder.png', backdrop: 'http://placeholder.png', online_available: true },
      { id: 1, type: 'anime', streamName: 'Anime-4', name: 'Anime 4', poster:'http://placeholder.png', backdrop: 'http://placeholder.png', online_available: true },
      { id: 1, type: 'anime', streamName: 'Anime-5', name: 'Anime 5', poster:'http://placeholder.png', backdrop: 'http://placeholder.png', online_available: true },
      { id: 1, type: 'anime', streamName: 'Anime-6', name: 'Anime 6', poster:'http://placeholder.png', backdrop: 'http://placeholder.png', online_available: true },
    ],
    isLoading: false,
  })),
}));

describe('Watchlist Page', () => {
  it('renders the watchlist page with mock data', async () => {
    const appConfig = {
      appName: 'Test App',
      appVersion: '1.0.0',
      backend_url: 'http://localhost:3000',
      configured: true,
      background_image: false,
    };

    render(
      <AppContextComponent appConfig={appConfig}>
        <Page />
      </AppContextComponent>
    );

    // Wait for the SWR data to load
    await waitFor(() => {
      expect(screen.getByTestId('headContainer')).toBeInTheDocument();
    });

    // Check for posters
    const posters = screen.getAllByAltText('poster');
    expect(posters.length).toBe(5); // Adjust based on your mock data
  });
});