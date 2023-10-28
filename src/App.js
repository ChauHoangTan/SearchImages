import { Route, Routes, HashRouter } from "react-router-dom";
import Home from './pages/home/Home'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
