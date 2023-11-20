import { useSelector } from 'react-redux';

const useRole = () => useSelector((state) => state.auth.role);

export default useRole;
