import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState
} from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/shell';
import { Event, listen } from '@tauri-apps/api/event';
import toast from 'react-hot-toast';
import { AuthenticationPayload, User } from '../types';

interface AuthProviderValue {
	user: User | null;
	logged: boolean;
	login: () => Promise<void>;
}

const context = createContext<AuthProviderValue>({} as AuthProviderValue);

export function AuthProvider({
	children
}: PropsWithChildren): React.ReactElement {
	const [user, setUser] = useState<User | null>(null);
	const toastRef = useRef<string | undefined>(undefined);

	useEffect(() => {
		const data = localStorage.getItem('@user');

		if (data === null) {
			return;
		}

		setUser(JSON.parse(data));
	}, []);

	useEffect(() => {
		const unlisten = listen<AuthenticationPayload>(
			'authentication',
			handleAuthenticationEvents
		);

		const unsub = () => {
			unlisten.then((fn) => fn());
		};

		return unsub;
	}, []);

	function handleAuthenticationEvents(event: Event<AuthenticationPayload>) {
		if (event.payload.step === 'start') {
			toastRef.current = toast.loading('Autenticando, por favor aguarde');
			return;
		}

		if (event.payload.error) {
			toast.error('Houve uma falha no processo de authenticação', {
				id: toastRef.current
			});
			toast.error(event.payload.error);
			return;
		}

		const user = event.payload.user as User;

		setUser(user);
		localStorage.setItem('@user', JSON.stringify(user));
		toast.success('Usuário authenticado com sucesso', {
			id: toastRef.current
		});
	}

	async function login() {
		const port = await invoke<number>('login');

		open(
			'https://accounts.google.com/o/oauth2/auth?' +
				'response_type=token&' +
				'client_id=743913190393-7g915213sjofvgkqo527ugfijqi38vmj.apps.googleusercontent.com&' +
				`redirect_uri=http://localhost:${port}&` +
				'scope=email%20profile%20openid&' +
				'prompt=consent'
		);
	}

	return (
		<context.Provider value={{ user, logged: !!user, login }}>
			{children}
		</context.Provider>
	);
}

export const useAuth = () => useContext(context);
