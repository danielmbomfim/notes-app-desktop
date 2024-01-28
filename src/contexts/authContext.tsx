import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState
} from 'react';
import { User } from '../types';

interface AuthProviderValue {
	user: User;
	logged: boolean;
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

	return (
		<context.Provider value={{ user, logged }}>{children}</context.Provider>
	);
}

export const useAuth = () => useContext(context);
