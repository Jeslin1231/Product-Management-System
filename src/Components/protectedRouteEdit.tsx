import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import {
  selectUserStatus,
  selectUserRole,
  selectUser,
} from '../features/users/UserSlice';
import { get } from '../utils/network';

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

  useEffect(() => {
    if (!loggedIn && !vendor) {
      console.log('not logged in');
      window.history.pushState({}, '', path);
      navigate('/error');
    }

    const getProduct = async () => {
      try {
        const response = await get(
          `http://localhost:3000/product/get_product/${id}`,
        );
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const data = await response.json();
        // console.log(data, data.product.vendor);
        if (data.product.vendor !== user.id) {
          console.log('not correct user');
          window.history.pushState({}, '', path);
          navigate('/error');
        }
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Request failed');
      }
    };
    getProduct();
  }, [loggedIn, vendor, path, navigate, id, user.id]);

  return <>{element}</>;
};

export default ProtectedRoute;
