import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectUserStatus,
  selectUserRole,
  selectUser,
} from '../features/users/UserSlice';

const ProtectedRoute: React.FC<{ path: string; element: React.ReactNode }> = ({
  path,
  element,
}) => {
  const loggedIn = useAppSelector(selectUserStatus);
  const vendor = useAppSelector(selectUserRole) === 'vendor';
  const user = useAppSelector(selectUser);
  // console.log(vendor);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  //   console.log(id, user.id);

  useEffect(() => {
    if (!loggedIn && !vendor) {
      window.history.pushState({}, '', path);
      navigate('/error');
    }

    if (id !== user.id) {
      window.history.pushState({}, '', path);
      navigate('/error');
    }
  }, [loggedIn, vendor, path, navigate, id, user.id]);

  return <>{element}</>;
};

export default ProtectedRoute;
