import React, {Component} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from '@ckeditor/ckeditor5-react';
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class BoardEdit extends Component {
    state = {
        id: '',
        title: '',
        content: '',
        userId: this.props.stores.userStore.user && this.props.stores.userStore.user.id
    };

    async componentDidMount() {
        await this.setState({
            ...this.state,
            id: this.props.match.params.id
        });

        try {
            let response = await axios({
                url: `http://localhost:8080/api/posts/${this.state.id}`,
                method: 'get',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                timeout: 3000
            });

            console.log(response);
            if (response.status === 200) {
                this.setState({
                    title: response.data.title,
                    content: response.data.content
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    render() {
        if (!this.props.stores.userStore.user)
            return <Redirect to='/'/>;
        return (
            <div className="board-modify">
                <h2>글 수정</h2>
                <div>
                    <div><input id="title" type="text" value={this.state.title} placeholder="제목을 입력하세요" onChange={this.updateTitle}/></div>
                    <br/>
                    <CKEditor editor={ClassicEditor}
                              data={this.state.content}
                              onChange={this.updateContent}/>
                </div>
                <div className="btn-small" onClick={this.editBoard}>수정하기</div>
                <div className="btn-small btn-list-board"><Link to={`/board/${this.props.match.params.id}`}>취소</Link></div>
            </div>
        );
    }

    editBoard = async () => {
        const { title, content } = this.state;

        const result = window.confirm("글을 수정하시겠습니까?");

        if (result) {
            if (!(title && content)) {
                alert('모든 항목을 채워주세요');
                return;
            }

            if (this.state.userId !== (this.props.stores.userStore.user && this.props.stores.userStore.user.id)) {
                alert("올바른 유저가 아닙니다");
                return;
            }

            try {
                let response = await axios({
                    url: `http://localhost:8080/api/posts`,
                    method: 'put',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    data: JSON.stringify(this.state),
                    timeout: 3000
                });

                console.log(response);
                if (response.status === 200) {
                    alert("글 수정 성공");
                    this.props.history.replace(`/board/${this.state.id}`)
                }
            } catch (error) {
                console.log(error.message);
                alert("글 수정 실패");
            }
        }
    };

    updateContent = (event, editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
        })
    }

    updateTitle = (event) => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    }
}

export default BoardEdit;