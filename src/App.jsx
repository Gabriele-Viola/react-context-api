import './App.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'
import Ricette from './pages/Ricette'
import Home from './pages/Home'
import About from './pages/About'

import AddRicetta from './pages/AddRicetta'
import FocusRicetta from './pages/FocusRicette'
import GlobalContexts from './contexts/GlobalContexts'
import DefaultLayout from './components/DefaultLayout'

const api_server = 'http://localhost:3000'
function App() {
  const api_server = 'http://localhost:3000'
  const api_endpoint = '/ricette/'

  const urlRicette = api_server + api_endpoint
  const [ricette, setRicette] = useState([])


  function fetchData(url = `${api_server}${api_endpoint}`) {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {

        setRicette(data.data)
      })
  }

  useEffect(fetchData, [])

  console.log(api_server);

  // allRicette.forEach((r) => {
  //   console.log(r);
  // })


  return (
    <>

      <GlobalContexts.Provider value={{ api_server, api_endpoint, fetchData, ricette, setRicette, urlRicette }} >

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
      </GlobalContexts.Provider>


    </>
  )
}

export default App
