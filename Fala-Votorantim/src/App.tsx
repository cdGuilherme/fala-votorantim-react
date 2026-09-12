import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// Páginas inicias

import LadingPage from './Pages/PaginaPrincipal/LandingPage/LandingPage';
import Sobre from './Pages/PaginaPrincipal/SobreNos/SobreNos'
import FeedDenuncia from './Pages/PaginaPrincipal/FeedDenuncias/FeedDenuncias'
import Registro from './Pages/PaginaPrincipal/Registro/Registro'

{/*ADM */}

import TelaInicialADM from './Pages/PaginaADM/TelaInicial/TelaInicial'
import DashboardADM from './Pages/PaginaADM/Dashboard/Dashboard'
import FeedDenunciasADM from './Pages/PaginaADM/FeedDenuncias/FeedDenuncias'


{/* Users */}

import TelaInicialUser from './Pages/PaginaUser/TelaInicialUser/TelaInicialUser'
import MeusDados from './Pages/PaginaUser/MeusDados/MeusDados'
import Notificacoes from './Pages/PaginaUser/Notificacoes/Notificacoes'
import MinhasDenuncias from './Pages/PaginaUser/MinhasDenuncias/MinhasDenuncias'

{/* em Comum entre eles */}

import CadastroDenuncias from './Pages/CadastroDenuncias/CadastroDenunciasUser'




function App() {


  return (
    <BrowserRouter>
      <Routes>

        {/* Páginas iniciais */}
        <Route path='/' element={<LadingPage />}/>
        <Route path='/Sobre' element={<Sobre />}/>
        <Route path='/Feed' element={<FeedDenuncia/>} />
        <Route path='/Registro' element={<Registro />}/>

        {/*ADM */}

        <Route path='/adm/TelaInicial' element={<TelaInicialADM/>}/>
        <Route path='/adm/Dashboard' element={<DashboardADM/>}/>
        <Route path='/adm/FeedDenuncias' element={<FeedDenunciasADM/>}/>
        
        {/* Users */}

        <Route path='/users/TeleInicial' element={<TelaInicialUser/>}/>
        <Route path='/users/MeusDados' element={<MeusDados />}/>
        <Route path='/users/notificacoes' element={<Notificacoes/>}/>
        <Route path='/users/MinhasDenuncias' element={<MinhasDenuncias/>}/>

        {/*em comum entre eles */}
        <Route path='/CadastroDenuncia' element={<CadastroDenuncias/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
