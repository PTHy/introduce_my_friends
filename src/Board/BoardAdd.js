import React, {Component} from 'react';
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {inject, observer} from "mobx-react";

@inject('stores')
@observer
class BoardAdd extends Component {
    state = {
        title: '',
        content: '',
        userId: this.props.stores.userStore.user && this.props.stores.userStore.user.id,
    };
    render() {
        if (!this.props.stores.userStore.user)
            return <Redirect to='/'/>;
        return (
            <div className="board-add">
                <h2>새 글쓰기</h2>
                <div>
                    <div><input id="title" type="text" value={this.state.title} placeholder="제목을 입력하세요" onChange={this.updateTitle}/></div>
                    <br/>
                    <CKEditor editor={ClassicEditor}
                              data={this.state.content}
                              onChange={this.updateContent}/>
                </div>
                <div className="btn-small" onClick={this.addNewBoard}>새 글추가</div>
                <div className="btn-small btn-list-board"><Link to='/'>목록으로</Link></div>
            </div>
        );
    }

    addNewBoard = async () => {
        const { title, content } = this.state;

        if (!(title && content)) {
            alert('모든 항목을 채워주세요');
            return;
        }
        try {
            let response = await axios({
                url: `http://localhost:8080/api/posts`,
                method: 'post',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                data: JSON.stringify(this.state),
                timeout: 3000
            });

            console.log(response);
            if (response.status === 200) {
                alert("글 추가 성공");
                this.props.history.replace('/')
            }
        } catch (error) {
            console.log(error.message);
            alert("글 추가 실패");
        }
    }

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

export default BoardAdd;