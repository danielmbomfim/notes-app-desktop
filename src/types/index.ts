import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ChangeEvent, ButtonHTMLAttributes, ReactNode } from 'react';

export interface Note {
	id: string;
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
	getNote: (id: string) => Promise<Note>;
	getNotes: (params?: QueryParams) => Promise<Note[]>;
	deleteNote: (id: string) => Promise<void>;
}

export interface FixedButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
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
	token: string;
}

export interface AuthenticationPayload {
	step: string;
	user?: User;
	error?: string;
}

export interface ModalContainerProps {
	children?: ReactNode;
	visible: boolean;
	onCloseRequest: () => void;
}

export interface ModalActionProps {
	onClick: () => void;
	text: string;
}

export interface ModalOption {
	text: string;
	action: () => void;
}

export interface ModalProps {
	visible: boolean;
	onCloseRequest: () => void;
}

export interface UserSettings {
	sync: boolean;
	runOnBackground: boolean;
}

export interface SettingsProvider {
	setSetting: (settings: UserSettings) => Promise<UserSettings>;
	getSetting: () => Promise<UserSettings>;
}
