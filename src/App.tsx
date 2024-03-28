import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import EditProduct from './Pages/EditProduct';
import Error from './Pages/Error';
import ForgetPWD from './Pages/ForgetPWD';
import Login from './Pages/Login';
import ProductDetail from './Pages/ProductDetail';
import ProductList from './Pages/ProductList';
import SignUp from './Pages/SignUp';
import UpdatePWD from './Pages/UpdatePWD';

import Footer from './Components/footer';
import Header from './Components/header';
import ErrorBoundary from './Components/errorBoundary';
import ProtectedRoute from './Components/protectedRoute';
import ProtectedRouteEdit from './Components/protectedRouteEdit';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col flex-grow">
        <Router>
          <ErrorBoundary>
            <Header />
            <div className="flex flex-grow bg-[#F9FAFB]">
              <Routes>
                <Route path="/" element={<Outlet />}>
                  {/* Product View Pages */}
                  <Route index element={<ProductList />} />
                  <Route path="productlist" element={<ProductList />} />
                  <Route path="productDetail/:id" element={<ProductDetail />} />

                  {/* Product Edit & Add Pages */}
                  <Route
                    path="createProduct"
                    element={
                      <ProtectedRoute
                        path="createProduct"
                        element={<EditProduct />}
                      />
                    }
                  />
                  <Route
                    path="editProduct/:id"
                    element={
                      <ProtectedRouteEdit
                        path="editProduct/:id"
                        element={<EditProduct />}
                      />
                    }
                  />

                  {/* Auth Pages */}
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="forgetpwd" element={<ForgetPWD />} />
                  <Route path="updatepwd" element={<UpdatePWD />} />

                  {/* Error Page */}
                  <Route path="*" element={<Error />} />
                </Route>
              </Routes>
            </div>
          </ErrorBoundary>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
