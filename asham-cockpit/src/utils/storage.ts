import { Preferences } from '@capacitor/preferences';

const TOKEN_KEY = 'asham_token';

export const tokenStorage = {
  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({ key: TOKEN_KEY });
    return value;
  },
  async setToken(token: string): Promise<void> {
    await Preferences.set({ key: TOKEN_KEY, value: token });
  },
  async clearToken(): Promise<void> {
    await Preferences.remove({ key: TOKEN_KEY });
  }
};
