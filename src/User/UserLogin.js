import React from 'react';

const UserLogin = (props) => {
    const { id, pw, handleChange } = props;
    return (
        <div className='user-login-container'>
            아이디 : <input type="text" id='inputAc' value={id} placeholder='아이디' onChange={handleChange}/> <br/>
            비밀번호 : <input type="password" id='inputPw' value={pw} placeholder='비밀번호' onChange={handleChange}/>
        </div>
    );
};

export default UserLogin;