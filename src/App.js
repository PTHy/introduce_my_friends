import React, {Component} from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import { Provider } from "mobx-react";

import './App.scss'

import Stores from './Stores'

import Home from './Home';
import User from './User';
import UserRegister from './User/UserRegister'

import BoardAdd from './Board/BoardAdd';
import BoardDetail from './Board/BoardDetail';
import BoardEdit from './Board/BoardEdit';

class App extends Component {
    render() {
        return (
            <Provider stores={Stores}>
                <BrowserRouter>
                    <header className='app-header'>
                        <ul className='menu-bar'>
                            <li><Link to='/'>게시판</Link></li>
                            <li><Link to='/user'>유저</Link></li>
                        </ul>
                    </header>
                    <section className='app-body'>
                        <Switch>
                            <Route exact path='/user/register' component={UserRegister}/>
                            <Route exact path='/user' component={User}/>

                            <Route exact path='/' component={Home}/>
                            <Route exact path='/board/add' component={BoardAdd} />
                            <Route path='/board/edit/:id' component={BoardEdit} />
                            <Route path='/board/:id' component={BoardDetail} />
                        </Switch>
                    </section>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;