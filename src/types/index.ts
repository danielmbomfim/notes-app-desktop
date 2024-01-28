import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ChangeEvent } from 'react';

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
	getNotes: (params?: QueryParams) => Promise<Note[]>;
	deleteNote: (id: number) => Promise<void>;
}

export interface FixedButtonProps {
	onClick: () => void;
	icon: IconProp;
}

export interface QueryParams {
	text?: string;
}

export interface SearchbarProps {
	onTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface SidebarProps {
	onSearchTextChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface User {
	id: number;
	email: string;
	name: string;
	image: string;
	autoSync: boolean;
}
