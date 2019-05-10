import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Pessoa from './Pessoa';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/pessoa' component={Pessoa}/>
    </Switch>
  </main>
)
export default Main