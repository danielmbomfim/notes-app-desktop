import { IconProp } from '@fortawesome/fontawesome-svg-core';

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
	options?: PopoverOption[];
}

export type EditionPageParams = {
	id: string;
};

export interface PopoverProps {
	options: PopoverOption[];
}

export interface PopoverOption {
	label: string;
	action: () => void;
}

export interface NotesProvider {
	createNote: (data: NoteDraft) => Promise<Note>;
	updateNote: (note: Note) => Promise<Note>;
	getNote: (id: number) => Promise<Note>;
	getNotes: () => Promise<Note[]>;
	deleteNote: (id: number) => Promise<void>;
}

export interface FixedButtonProps {
	onClick: () => void;
	icon: IconProp;
}
