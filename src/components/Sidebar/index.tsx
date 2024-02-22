import { useState } from 'react';
import SettingsModal from './components/SettingsModal';
import CloseModal from './components/CloseModal';
import Searchbar from '../Searchbar';
import { useAuth } from '../../contexts/authContext';
import { SidebarProps } from '../../types';
import {
	Container,
	FakeImage,
	Option,
	ProfileImage,
	OptionTitle,
	OptionText
} from './styles';

export default function SideBar({
	onSearchTextChange
}: SidebarProps): React.ReactElement {
	const { user, logged, login } = useAuth();
	const [showCloseModal, setShowCloseModal] = useState(false);
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	return (
		<Container>
			<Option onClick={logged ? undefined : login}>
				{logged && (
					<ProfileImage src={user?.image} alt="Imagem de perfil" />
				)}
				{!logged && <FakeImage>A</FakeImage>}
				<OptionTitle>{logged ? user?.name : 'Anônimo'}</OptionTitle>
			</Option>
			<Searchbar onTextChange={onSearchTextChange} />
			<Option>
				<OptionText onClick={() => setShowSettingsModal(true)}>
					Configurações
				</OptionText>
			</Option>
			{logged && (
				<Option onClick={() => setShowCloseModal(true)}>
					<OptionText>Sair</OptionText>
				</Option>
			)}
			<CloseModal
				visible={showCloseModal}
				onCloseRequest={() => setShowCloseModal(false)}
			/>
			<SettingsModal
				visible={showSettingsModal}
				onCloseRequest={() => setShowSettingsModal(false)}
			/>
		</Container>
	);
}
