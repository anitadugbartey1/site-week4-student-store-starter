// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import axios from "axios";
// import SubNavbar from "../SubNavbar/SubNavbar";
// import Sidebar from "../Sidebar/Sidebar";
// import Home from "../Home/Home";
// import ProductDetail from "../ProductDetail/ProductDetail";
// import NotFound from "../NotFound/NotFound";
// import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
// import "./App.css";

// function App() {

//   // State variables
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeCategory, setActiveCategory] = useState("All Categories");
//   const [searchInputValue, setSearchInputValue] = useState("");
//   const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState({});
//   const [isFetching, setIsFetching] = useState(false);
//   const [isCheckingOut, setIsCheckingOut] = useState(false);
//   const [error, setError] = useState(null);
//   const [order, setOrder] = useState(null);

//   // Toggles sidebar
//   const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

//   // Functions to change state (used for lifting state)
//   const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
//   const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
//   const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
//   const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

//   const handleOnSearchInputChange = (event) => {
//     setSearchInputValue(event.target.value);
//   };

//   const handleOnCheckout = async () => {
//   }


//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Sidebar
//           cart={cart}
//           error={error}
//           userInfo={userInfo}
//           setUserInfo={setUserInfo}
//           isOpen={sidebarOpen}
//           products={products}
//           toggleSidebar={toggleSidebar}
//           isCheckingOut={isCheckingOut}
//           addToCart={handleOnAddToCart}
//           removeFromCart={handleOnRemoveFromCart}
//           getQuantityOfItemInCart={handleGetItemQuantity}
//           getTotalItemsInCart={handleGetTotalCartItems}
//           handleOnCheckout={handleOnCheckout}
//           order={order}
//           setOrder={setOrder}
//         />
//         <main>
//           <SubNavbar
//             activeCategory={activeCategory}
//             setActiveCategory={setActiveCategory}
//             searchInputValue={searchInputValue}
//             handleOnSearchInputChange={handleOnSearchInputChange}
//           />
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Home
//                   error={error}
//                   products={products}
//                   isFetching={isFetching}
//                   activeCategory={activeCategory}
//                   setActiveCategory={setActiveCategory}
//                   addToCart={handleOnAddToCart}
//                   searchInputValue={searchInputValue}
//                   removeFromCart={handleOnRemoveFromCart}
//                   getQuantityOfItemInCart={handleGetItemQuantity}
//                 />
//               }
//             />
//             <Route
//               path="/:productId"
//               element={
//                 <ProductDetail
//                   cart={cart}
//                   error={error}
//                   products={products}
//                   addToCart={handleOnAddToCart}
//                   removeFromCart={handleOnRemoveFromCart}
//                   getQuantityOfItemInCart={handleGetItemQuantity}
//                 />
//               }
//             />
//             <Route
//               path="*"
//               element={
//                 <NotFound
//                   error={error}
//                   products={products}
//                   activeCategory={activeCategory}
//                   setActiveCategory={setActiveCategory}
//                 />
//               }
//             />
//           </Routes>
//         </main>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
 
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";


function App() {
  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: "" });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Error fetching products. Please try again.");
        setIsFetching(false);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array ensures useEffect runs only on mount
  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);
  // Handler for search input change
  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };
  // Function to handle checkout
  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Prepare order payload
      const orderItems = Object.keys(cart).map((productId) => ({
        product_id: parseInt(productId),
        quantity: cart[productId],
        price: products.find((p) => p.id === parseInt(productId)).price,
      }));
      const payload = {
        orderItems: orderItems,
        total_price: 0.00,
        customer_id: userInfo.name,
        status: "purchased",

      };
      console.log(payload)
      // Send order data to backend
      const response = await axios.post("http://localhost:3000/orders", payload);
      // Update state with the created order and reset cart
      setOrder(response.data);
      setCart({});
      setIsCheckingOut(false);
    } catch (error) {
      console.error("Error placing order:", error);
      setError("Error placing order. Please try again.");
      setIsCheckingOut(false);
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;