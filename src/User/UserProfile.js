import React from 'react';
import { Link } from 'react-router-dom';
import './User.scss'

const UserProfile = (props) => {
    return (
        <div>
            <div>아이디 : { props.user.account }</div>
            <div>이름 : { props.user.name }</div>
            <div>이메일 : { props.user.email }</div>
            <div>
                <div className='btn-small' onClick={props.handleLogOut}>로그아웃</div>
                <div className='btn-small'><Link to='/user/edit'>정보 수정</Link></div>
            </div>
        </div>
    );
};

export default UserProfile;