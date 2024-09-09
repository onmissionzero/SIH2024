import { Navigate } from 'react-router-dom';
import { useProfile } from '../contexts/Profile';

const PrivateRoute = ({ element }) => {
  const { user } = useProfile();

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
