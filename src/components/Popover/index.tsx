import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Trigger, UserOption, UserOptionsContainer } from './styles';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from 'styled-components';
import { PopoverProps } from '../../types';

export default function Popover({ options }: PopoverProps): React.ReactElement {
	const theme = useTheme();
	const [visible, setVisible] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	function handleClickOutside(evt: MouseEvent) {
		if (!triggerRef.current || !menuRef.current) {
			return;
		}

		if (
			!triggerRef.current.contains(evt.target as Node | null) &&
			!menuRef.current.contains(evt.target as Node | null)
		) {
			setVisible(false);
		}
	}

	return (
		<Trigger
			$visible={options.length > 0}
			ref={triggerRef}
			onClick={() => setVisible(!visible)}
		>
			<FontAwesomeIcon
				icon={faEllipsisVertical}
				size="xl"
				color={theme.details}
			/>
			<UserOptionsContainer
				style={visible ? { display: 'block' } : { display: 'none' }}
				ref={menuRef}
			>
				{options.map((option) => (
					<UserOption onClick={option.action}>
						{option.label}
					</UserOption>
				))}
			</UserOptionsContainer>
		</Trigger>
	);
}
