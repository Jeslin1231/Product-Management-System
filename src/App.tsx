import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import './App.css';
import ProductList from './Pages/ProductList';
import ProductDetail from './Pages/ProductDetail';
import EditProduct from './Pages/EditProduct';
import Error from './Pages/Error';
import ForgetPWD from './Pages/ForgetPWD';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import UpdatePWD from './Pages/UpdatePWD';

import Footer from './Components/footer';
import Header from './Components/header';
import purpleButton from './Components/purpleButton';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow">
        <Router>
          <Routes>
            <Route path="/" element={<Outlet />}>
              {/* Product View Pages */}
              <Route index element={<ProductList />} />
              <Route path="productlist" element={<ProductList />} />
              <Route path="productdetail" element={<ProductDetail />} />
              {/* <Route path="productDetail/:id" element={<ProductDetail />} /> */}

              {/* Product Edit & Add Pages */}
              <Route path="editproduct" element={<EditProduct />} />

              {/* Auth Pages */}
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgetpwd" element={<ForgetPWD />} />
              <Route path="updatepwd" element={<UpdatePWD />} />

              {/* Error Page */}
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
};

export default App;
