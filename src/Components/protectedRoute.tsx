import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectUserStatus, selectUserRole } from '../features/users/UserSlice';

const ProtectedRoute: React.FC<{ path: string; element: React.ReactNode }> = ({
  path,
  element,
}) => {
  const loggedIn = useAppSelector(selectUserStatus);
  const vendor = useAppSelector(selectUserRole) === 'vendor';
  // console.log(vendor);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && !vendor) {
      window.history.pushState({}, '', path);
      navigate('/error');
    }
  }, [loggedIn, vendor, path, navigate]);

  return <>{element}</>;
};

export default ProtectedRoute;
