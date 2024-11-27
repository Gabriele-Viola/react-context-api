import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Ricette from './pages/Ricette'
import Home from './pages/Home'
import About from './pages/About'
import DefaultLayout from './Components/DefaultLayout'
import AddRicetta from './pages/AddRicetta'
import FocusRicetta from './pages/focusRicette'

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>

            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>

            <Route path='/ricette'>
              <Route index element={<Ricette />}></Route>
              <Route path=':slug' element={<FocusRicetta />} />
              <Route path='addricetta' element={<AddRicetta />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
