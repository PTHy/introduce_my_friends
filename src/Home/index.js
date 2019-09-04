import React, {Component} from 'react';
import './home.scss'
import { inject, observer } from 'mobx-react';
import Board from '../Board';

@inject('stores')
@observer
class Home extends Component {
    state = {
        value: 1
    };

    render() {
        let { timeStore: t, postStore: p } = this.props.stores;
        return (
            <div className="home-container">
                <Board />
            </div>
        );
    }
}

export default Home;