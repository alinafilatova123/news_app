import MainPage from "./pages/MainPage"
import Modal from 'react-modal';

function App() {

  Modal.setAppElement('#root');

  return (
    <>
      <MainPage/>
    </>
  )
}

export default App
