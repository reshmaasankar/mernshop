import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import Productdetails from "./components/Productdetails";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Shipping from "./screens/Shipping";
import PrivateRoute from "./components/PrivateRoute";
import Payment from "./screens/Payment";
import PlaceOrder from "./screens/PlaceOrder";
import { OrderDetails } from "./screens/OrderDetails";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Productdetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path='' element={<PrivateRoute />}>
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/placeorder" element={<PlaceOrder />} />
                  <Route path="/order/:id" element={<OrderDetails />} />
              </Route>

            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
