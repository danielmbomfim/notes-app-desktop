import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Input } from './styles';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components';
import { SearchbarProps } from '../../types';

export default function Searchbar({
	onTextChange
}: SearchbarProps): React.ReactElement {
	const theme = useTheme();

	return (
		<Container>
			<Input onChange={onTextChange} />
			<FontAwesomeIcon
				icon={faSearch}
				color={theme.primary.contrastText}
			/>
		</Container>
	);
}
