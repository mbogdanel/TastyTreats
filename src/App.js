import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './components/LandingPage'
import Contact from './components/Contact'
import Inquiries from './components/Inquiries'

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>
          <Route path='/inquiries'>
            <Inquiries />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
}

export default App
