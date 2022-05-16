import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import RoutesComponent from 'src/Routes'
import Authorization from 'src/components/Authorization/Authorization'
import Loading from './components/Loading/Loading'

function App() {
  return (
    <div className="App">
      <Loading />
      <RoutesComponent />
      <ToastContainer />
      <Authorization />
    </div>
  )
}

export default App
