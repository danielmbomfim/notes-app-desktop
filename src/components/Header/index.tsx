import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from './styles';
import { HeaderProps } from '../../types';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components';

export default function Header({ title }: HeaderProps): React.ReactElement {
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<Container>
			<Button onClick={() => navigate('/')}>
				<FontAwesomeIcon
					icon={faArrowLeft}
					size="lg"
					color={theme.details}
				/>
			</Button>
			{title}
		</Container>
	);
}
