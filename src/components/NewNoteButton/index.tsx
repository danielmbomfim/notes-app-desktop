import { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Container } from './styles';

export default function NewNoteButton(): React.ReactElement {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Container onClick={() => navigate('new-notes-page')}>
			<FontAwesomeIcon icon={faPlus} color={theme.primary} size="2x" />
		</Container>
	);
}
