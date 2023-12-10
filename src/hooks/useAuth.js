import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TokenHelper from '../utils/helpers/tokenHelper';
import { setId, setRole, setToken, clearToken } from '../redux/slices/authSlice';

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const tokenHelper = useMemo(() => new TokenHelper(token), [token]);
  const tokenPayload = useMemo(() => tokenHelper.getPayload(), [tokenHelper]);
  const leftTime = tokenPayload ? tokenPayload.exp - Date.now() : 0;

  const logIn = useCallback(
    (newToken) => {
      localStorage.setItem('token', newToken);
      dispatch(setToken(newToken));
    },
    [dispatch],
  );

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    dispatch(clearToken());
  }, [dispatch]);

  useEffect(() => {
    const verifyTokenTimeout = setTimeout(() => {
      logOut();
    }, leftTime);

    return () => clearTimeout(verifyTokenTimeout);
  }, [leftTime, logOut]);

  useEffect(() => {
    const { id, role } = tokenPayload || {};
    dispatch(setId(id));
    dispatch(setRole(role?.toLowerCase()));
  }, [dispatch, tokenPayload]);

  return { logIn, logOut, token };
};

export default useAuth;
