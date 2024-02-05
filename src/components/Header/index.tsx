import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from './styles';
import { HeaderProps } from '../../types';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components';
import Popover from '../Popover';

export default function Header({
	title,
	onGoBack,
	options
}: HeaderProps): React.ReactElement {
	const navigate = useNavigate();
	const theme = useTheme();

	function goBack() {
		if (onGoBack) {
			onGoBack();
		}

		navigate('/');
	}

	return (
		<Container>
			<Button onClick={goBack}>
				<FontAwesomeIcon
					icon={faArrowLeft}
					size="lg"
					color={theme.primary.contrastText}
				/>
			</Button>
			{title}
			<Popover options={options || []} />
		</Container>
	);
}
