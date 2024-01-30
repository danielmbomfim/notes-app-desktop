import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { invoke } from '@tauri-apps/api/tauri';
import { open } from '@tauri-apps/api/shell';
import { Event, listen } from '@tauri-apps/api/event';
import toast from 'react-hot-toast';
import { AuthenticationPayload, User } from '../types';

interface AuthProviderValue {
	user: User;
	logged: boolean;
	login: () => Promise<void>;
}

const context = createContext<AuthProviderValue>({} as AuthProviderValue);

export function AuthProvider({
	children
}: PropsWithChildren): React.ReactElement {
	const [logged, setLogged] = useState(false);
	const [user, setUser] = useState<User>({} as User);

	useEffect(() => {
		const data = localStorage.getItem('@user');

		if (data === null) {
			setLogged(false);
			return;
		}

		setUser(JSON.parse(data));
		setLogged(true);
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
		if (event.payload.error) {
			toast.error('Houve uma falha no processo de authenticação');
			toast.error(event.payload.error);
			return;
		}

		const user = event.payload.user as User;

		setUser(user);
		localStorage.setItem('@user', JSON.stringify(user));
		toast.success('Usuário authenticado com sucesso');
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
		<context.Provider value={{ user, logged, login }}>
			{children}
		</context.Provider>
	);
}

export const useAuth = () => useContext(context);
