import { invoke } from '@tauri-apps/api/tauri';
import { UserSettings, SettingsProvider } from '../types';

class SettingsService implements SettingsProvider {
	async getSetting() {
		const setting = await invoke<UserSettings>('get_setting');

		return setting;
	}

	async setSetting(settings: UserSettings) {
		const updatedSetting = await invoke<UserSettings>('set_setting', {
			...settings
		});

		return updatedSetting;
	}
}

export default new SettingsService();
