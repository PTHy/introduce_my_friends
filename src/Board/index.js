import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from 'react-router-dom'

import BoardList from './BoardList';

import './Board.scss';

@inject('stores')
@observer
class Board extends Component {

    componentDidMount() {
        this.props.stores.postStore.fetchItems();
    }

    render() {
        let p = this.props.stores.postStore;
        let u = this.props.stores.userStore;
        let btnNewPost = null;
        if (u.user)
            btnNewPost = <Link to="/board/add"><div className="btn-new-board">새 글 추가</div></Link>;
        return (
            <div>
                {p.items && <BoardList items={p.items}/>}
                {btnNewPost}
            </div>
        );
    }
}

export default Board;