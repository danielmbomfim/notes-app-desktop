export interface Note {
	id: number;
	title: string;
	content: string;
}

export interface NoteDraft {
	title: string;
	content: string;
}

export interface HeaderProps {
	title: string;
	onGoBack?: () => void;
	options?: { label: string; action: string }[];
}

export type EditionPageParams = {
	id: string;
};

export interface NotesProvider {
	createNote: (data: NoteDraft) => Promise<Note>;
	updateNote: (note: Note) => Promise<Note>;
	getNote: (id: number) => Promise<Note>;
	getNotes: () => Promise<Note[]>;
}
