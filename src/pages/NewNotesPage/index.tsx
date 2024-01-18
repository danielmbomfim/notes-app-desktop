import { useState } from 'react';
import { Container, TitleInput, ContentInput } from './styles';
import Header from '../../components/Header';

export default function NewNotePage(): React.ReactElement {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	return (
		<>
			<Header title="Nova anotação" />
			<Container>
				<TitleInput
					placeholder="Título"
					value={title}
					onChange={(evt) => setTitle(evt.target.value)}
				/>
				<ContentInput
					placeholder="Sua anotação"
					value={content}
					onChange={(evt) => setContent(evt.target.value)}
				/>
			</Container>
		</>
	);
}
