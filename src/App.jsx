import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import Login from './Login';
import Signup from './Signup';
import ErrorPage from './errorPage';
import ProtectedRoutes from './utils/protectedRoutes';

function App() {

  return (
    <>
    <Router>
      <div className='App'>
        <div className="content">
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route element={<ProtectedRoutes />}>
                <Route path='/home' element={
                  <>
                    <Navbar />
                    <Home />
                  </>
                }>
                </Route>
                <Route path='/create' element={
                  <>
                    <Navbar />
                    <Create />
                  </>
                }>
                </Route>
                <Route path='/blogs/:id' element={
                  <>
                    <Navbar />
                    <BlogDetails />
                  </>
                }>
                </Route>
            </Route>
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  )
}

export default App
