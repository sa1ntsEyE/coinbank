import {useSelector} from 'react-redux';

export function useAuth() {
    const {token, id, photo , name , nickname, username, email} = useSelector(state => state.user);
    return {
        isAuth: !!token,
        token,
        id,
        photo,
        name,
        nickname,
        username,
        email
    }
}