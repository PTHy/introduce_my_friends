import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import { Link } from 'react-router-dom';
import axios from 'axios'

@inject('stores')
@observer
class BoardDetail extends Component {
    state = {
        post: ''
    };
    async componentDidMount() {
        let { match } = this.props;
        try {
            let response = await axios({
                url: `http://localhost:8080/api/posts/${match.params.id}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });

            console.log(response);
            if (response.status === 200) {
                this.setState({
                    post: response.data
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        let { post } = this.state;

        let button = null;
        if (post.userId === (this.props.stores.userStore.user && this.props.stores.userStore.user.id)) {
            button = <div>
                <div className="btn-small btn-delete" onClick={this.deleteBoard}>삭제</div>
                <div className="btn-small"><Link to={`/board/edit/${this.props.match.params.id}`}>수정</Link></div>
            </div>
        }
        return (
            <div className="board-detail">
                <h2>{post.title}</h2>
                <hr/>
                <div className="created">작성 시간 : {new Date(post.created).toLocaleDateString()}</div>
                <div dangerouslySetInnerHTML={ {__html: post.content} } />
                <div>
                    <div className="btn-small btn-list-board"><Link to='/'>목록으로</Link></div>
                </div>
                {button}
            </div>
        );
    }

    deleteBoard = async () => {
        let { match } = this.props;
        try {
            const result = window.confirm("글을 삭제하시겠습니까?");

            if (result) {
                if (this.state.post.userId !== (this.props.stores.userStore.user && this.props.stores.userStore.user.id)) {
                    alert("올바른 유저가 아닙니다");
                    return;
                }

                await axios({
                    url: `http://localhost:8080/api/posts/${match.params.id}`,
                    method: 'delete',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    timeout: 3000
                });

                alert("글이 삭제되었습니다");
                this.props.history.replace('/')
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

export default BoardDetail;