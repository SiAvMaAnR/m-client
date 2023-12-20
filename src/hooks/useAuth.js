import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import TokenHelper from '../utils/helpers/tokenHelper';
import { setInfo, clearInfo } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = useCallback(
    (token) => {
      localStorage.setItem('token', token);

      const tokenHelper = new TokenHelper(token);
      const tokenPayload = tokenHelper.getPayload();

      const { id, role, exp } = tokenPayload;
      const isLogged = true;

      dispatch(setInfo({ id, role, isLogged, exp, token }));
    },
    [dispatch],
  );

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    dispatch(clearInfo());
  }, [dispatch]);

  return { logIn, logOut };
};

export default useAuth;
