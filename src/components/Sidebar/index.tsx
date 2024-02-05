import { useState } from 'react';
import Searchbar from '../Searchbar';
import Modal from '../Modal';
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
	const { user, logged, login, logout } = useAuth();
	const [showModal, setShowModal] = useState(false);

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
				<OptionText>Configurações</OptionText>
			</Option>
			{logged && (
				<Option onClick={() => setShowModal(true)}>
					<OptionText>Sair</OptionText>
				</Option>
			)}
			<Modal
				visible={showModal}
				onCloseRequest={() => setShowModal(false)}
				content="Tem certeza que deseja sair da sua conta?"
				options={[
					{ action: () => null, text: 'Cancelar' },
					{ action: logout, text: 'Confirmar' }
				]}
			/>
		</Container>
	);
}
