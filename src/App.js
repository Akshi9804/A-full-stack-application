import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import RootLayout from './components/RootLayout'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import AboutUs from './components/aboutUs/AboutUs'
import Products from './components/products/Products'
import Cart from './components/cart/Cart';
import UserProfile from './components/userProfile/UserProfile';


function App() {
  //importing createBrowserRouter
  const routerObj=createBrowserRouter([
    //routing details
    {
      path:'/',
      element:<RootLayout />,
      children:[
        {
          path:'/',
          element:<Home />
        },
        {
          path:'/register',
          element:<Register />
        },
        {
          path:'/login',
          element:<Login />
        },
        {
          path:'/aboutus',
          element:<AboutUs />
        },
        {
          path:'/user-profile',
          element:<UserProfile />,
          children:[
            {
              path:"products",
              element:<Products />
            },
            {
              peth:"cart",
              element:<Cart />
            }
          ]
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={routerObj}/>
    </div>
  );
}

export default App;
