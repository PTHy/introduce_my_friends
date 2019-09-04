import React, {Component} from 'react';
import UserLogin from './UserLogin';
import {inject, observer} from "mobx-react";
import './User.scss'
import {Link} from "react-router-dom";
import UserProfile from "./UserProfile";

@inject('stores')
@observer
class User extends Component {
    state = {
      account: "",
      password: ""
    };

    render() {
        let u = this.props.stores.userStore;

        if (!u.user) {
            return (
                <div className="user-container container">
                    <UserLogin id={this.state.account} pw={this.state.password} handleChange={this.handleChange}/>
                    <div className='btn-group'>
                        <div className="btn-small" onClick={this.handleLogin}>로그인</div>
                        <div className="btn-small"><Link to='/user/register'>회원가입</Link></div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="user-container">
                    <UserProfile user={u.user} handleLogOut={this.handleLogOut}/>
                </div>
            );
        }
    }

    handleChange = (event) => {
        switch(event.target.id) {
            case 'inputAc':
                this.setState({
                    ...this.state,
                    account: event.target.value,
                });
                break;
            case 'inputPw':
                this.setState({
                    ...this.state,
                    password: event.target.value,
                });
                break;
        }
    }

    handleLogOut = () => {
        this.props.stores.userStore.logout();
        alert('로그아웃 되었습니다');
    }

    handleLogin = async () => {
        if (!this.isValid()) {
            alert('모든 항목을 채워주세요');
            return;
        }

        if (await this.props.stores.userStore.login(this.state)) {
            alert('로그인 성공');
        } else {
            alert('로그인에 실패하였습니다');
        }
    }

    isValid = () => {
        const { account, password } = this.state;
        return account && password;
    }
}

export default User;