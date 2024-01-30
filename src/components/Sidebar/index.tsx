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

	return (
		<Container>
			<Option onClick={login}>
				{logged && (
					<ProfileImage src={user.image} alt="Imagem de perfil" />
				)}
				{!logged && <FakeImage>A</FakeImage>}
				<OptionTitle>{logged ? user.name : 'Anônimo'}</OptionTitle>
			</Option>
			<Searchbar onTextChange={onSearchTextChange} />
			<Option>
				<OptionText>Configurações</OptionText>
			</Option>
			<Option>
				<OptionText>Sair</OptionText>
			</Option>
		</Container>
	);
}
