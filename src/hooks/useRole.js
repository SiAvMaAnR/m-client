import { useSelector } from 'react-redux';

const useRole = () => {
  const role = useSelector((state) => state.auth.info.role);
  return role.toLowerCase();
};

export default useRole;
