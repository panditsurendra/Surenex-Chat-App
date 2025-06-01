import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home'; // as the file name is index.js so no need to specify it
// if the file name was something else, we would have to specify it like './pages/home.js'
import Login from './pages/login';
import Signup from './pages/signup';
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/protectedRoute";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import Profile from "./pages/profile";

function App() {
  const { loader } = useSelector(state => state.loaderReducer);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loader &&  <Loader /> }
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ 
              <ProtectedRoute> 
                  <Home />
              </ProtectedRoute> }> 
          </Route>
          
          <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute> }>
          </Route>

          {/* <Route path="/" element={  <Home />  }> </Route> */}

           <Route path="/login" element={<Login /> }></Route>
           <Route path="/signup" element={<Signup /> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;