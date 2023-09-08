import React, { useEffect, useState } from 'react';
import { deleteUser, getUserListAll, registerUser, updateUser } from '../../api/users';

function Main(props) {
    const emptyUser = {
        userId: "",
        username: "",
        name: "",
        phone: ""
    };

    const [ userInput, setUserInput ] = useState(emptyUser);

    const [ userList, setUserList ] = useState([]);

    const [ mode, setMode ] = useState(0);
    
    const requestGetUserListAll = () => {
        getUserListAll()
        .then(response => {
            console.log(response);
            setUserList(response.data);
            setUserInput(emptyUser);
        })
    }

    useEffect(() => {
        requestGetUserListAll();
    }, [])

    const handleUserInputChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });
    }

    const handleRegisterClick = () => {
        setMode(1);
        setUserInput(emptyUser);
    }

    const handleRegisterSubmitClick = async () => {
        await registerUser(userInput);
        requestGetUserListAll();
    }

    const handleUpdateClick = async () => {
        await updateUser(userInput);
        requestGetUserListAll();
    }

    const handleDeleteClick = async () => {
        await deleteUser(userInput);
        requestGetUserListAll();
    }

    const handleSelectClick = (user) => {
        setMode(2);
        setUserInput(user);
    }

    return (
        <div>
            <div>
                <input type="text" name="userId" placeholder="user-id" 
                    onChange={handleUserInputChange}
                    value={userInput.userId}
                    disabled />
            </div>
            <div>
                <input type="text" name="username" placeholder="username" 
                onChange={handleUserInputChange}
                value={userInput.username}
                disabled={mode === 0} />
            </div>
            <div>
                <input type="text" name="name" placeholder="name" 
                onChange={handleUserInputChange}
                value={userInput.name}
                disabled={mode === 0} />
            </div>
            <div>
                <input type="text" name="phone" placeholder="phone" 
                onChange={handleUserInputChange}
                value={userInput.phone}
                disabled={mode === 0} />
            </div>
            {mode === 1 
            ? <button onClick={handleRegisterSubmitClick}>확인</button> 
            : <button onClick={handleRegisterClick}>등록하기</button>}
            
            <button onClick={handleUpdateClick} disabled={mode !== 2}>수정하기</button>
            <button onClick={handleDeleteClick} disabled={mode !== 2}>삭제하기</button>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>사용자명</th>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>선택</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(user => 
                            <tr key={user?.userId}>
                                <td>{user?.userId}</td>
                                <td>{user?.username}</td>
                                <td>{user?.name}</td>
                                <td>{user?.phone}</td>
                                <td><button onClick={() => {handleSelectClick(user);}}>✔</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Main;