import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
// import 'src/assets/styles/global.scss'
import RoutesComponent from './Routes'

function App() {
  return (
    <div className="App">
      <RoutesComponent />
      <ToastContainer />
    </div>
  )
}

export default App
