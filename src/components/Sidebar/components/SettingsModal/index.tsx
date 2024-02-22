import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import Switch from 'react-switch';
import Modal from '../../../Modal';
import { useAuth } from '../../../../contexts/authContext';
import { ModalProps, UserSettings } from '../../../../types';
import {
	Container,
	UserArea,
	ProfileImage,
	FakeImage,
	Subtitle,
	Label,
	HorizontalArea
} from './styles';

export default function SettingsModal({
	visible,
	onCloseRequest
}: ModalProps): React.ReactElement {
	const { logged, user } = useAuth();
	const theme = useTheme();
	const [settings, setSettings] = useState<UserSettings>({
		runOnBackground: true,
		sync: true
	});

	useEffect(() => {
		function handleEsc(evt: KeyboardEvent) {
			if (evt.key === 'Escape' || evt.key === 'Esc') {
				onCloseRequest();
			}
		}

		window.addEventListener('keydown', handleEsc);

		return () => window.removeEventListener('keydown', handleEsc);
	}, [visible]);

	useEffect(() => {
		function getSettings() {
			setSettings({
				runOnBackground: true,
				sync: logged ? true : false
			});
		}

		getSettings();
	}, [logged, visible]);

	function saveSettings() {
		onCloseRequest();
	}

	return (
		<Modal.Container visible={visible} onCloseRequest={onCloseRequest}>
			<Modal.Content>
				<Container>
					<UserArea>
						{logged && (
							<ProfileImage
								src={user?.image}
								alt="Imagem de perfil"
							/>
						)}
						{!logged && <FakeImage>A</FakeImage>}
						<Subtitle>{logged ? user?.name : 'Anônimo'}</Subtitle>
					</UserArea>
					<HorizontalArea>
						<Label>Ativar/desativar sincronização</Label>
						<Switch
							disabled={!logged}
							checked={settings.sync}
							onChange={(v) =>
								setSettings({ ...settings, sync: v })
							}
							checkedIcon={false}
							uncheckedIcon={false}
							onColor={theme.secondary.main}
						/>
					</HorizontalArea>
					<HorizontalArea>
						<Label>Executar em segundo plano</Label>
						<Switch
							checked={settings.runOnBackground}
							onChange={(v) =>
								setSettings({ ...settings, runOnBackground: v })
							}
							checkedIcon={false}
							uncheckedIcon={false}
							onColor={theme.secondary.main}
						/>
					</HorizontalArea>
				</Container>
			</Modal.Content>
			<Modal.ActionsArea>
				<Modal.Action text="Cancelar" onClick={onCloseRequest} />
				<Modal.Action text="Confirmar" onClick={saveSettings} />
			</Modal.ActionsArea>
		</Modal.Container>
	);
}
