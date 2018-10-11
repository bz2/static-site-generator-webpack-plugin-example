import React from 'react'
import { Route, Switch } from 'react-router'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Tech from './pages/Tech/Tech'
import Contact from './pages/Contact/Contact'
import style from './App.css'

export default class App extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/tech' component={Tech}/>
          <Route path='/contact' component={Contact}/>
        </Switch>
        <Footer />
      </div>
    )
  }
}
