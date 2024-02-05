import { useTheme } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from './styles';
import { FixedButtonProps } from '../../types';

export default function FixedButton({
	onClick,
	icon
}: FixedButtonProps): React.ReactElement {
	const theme = useTheme();

	return (
		<Container onClick={onClick}>
			<FontAwesomeIcon
				icon={icon}
				color={theme.secondary.contrastText}
				size="2x"
			/>
		</Container>
	);
}
