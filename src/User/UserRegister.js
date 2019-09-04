import React, {Component} from 'react';
import './User.scss'
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";

@inject('stores')
@observer
class UserRegister extends Component {
    state = {
      account: '',
      password: '',
      name: '',
      email: '',
      isLogin: false,
    };

    render() {
        const u = this.props.stores.userStore;

        if (u.user)
            return <Redirect to='/user'/>;

        return (
            <div className='user-register-container'>
               아이디 : <input id='account' type="text" value={this.state.account} onChange={this.handleChange}/><br/>
               비밀번호 : <input id='password' type="password" value={this.state.password} onChange={this.handleChange}/><br/>
               이름 : <input id='name' type="text" value={this.state.name} onChange={this.handleChange}/><br/>
               이메일 : <input id='email' type="text" value={this.state.email} onChange={this.handleChange}/>
               <div>
                   <div className='btn-small' onClick={this.handleRegister}>회원가입</div>
               </div>
            </div>
        );
    }

    handleChange = (event) => {
        switch (event.target.id) {
            case 'account':
                this.setState({
                    ...this.state,
                    account: event.target.value,
                });
                break;
            case 'password':
                this.setState({
                    ...this.state,
                    password: event.target.value,
                });
                break;
            case 'name':
                this.setState({
                    ...this.state,
                    name: event.target.value,
                });
                break;
            case 'email':
                this.setState({
                    ...this.state,
                    email: event.target.value,
                });
                break;
        }
    };

    handleRegister = async () => {
        if (!this.isValid()) {
            alert('모든 항목을 채워주세요');
            return;
        }

        if (await this.props.stores.userStore.register(this.state)) {
            alert('회원가입 성공');
            this.props.history.replace('/user')
        } else {
            alert('회원가입에 실패하였습니다');
        }
    }

    isValid = () => {
        const { account, password, name, email } = this.state;
        return account && password && name && email;
    }
}

export default UserRegister;