import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import moment from 'moment'
import CURRENT_URL from '../../constants/constants';

const ControlPanel = () => {
    const [usersList, setUsersList] = useState('');
    const getUsersList = async () => {
        try {
            const token = localStorage.getItem('tokenUsr');
            const usersListData = await axios.get(`${CURRENT_URL}/user/list`,
            { headers: { authorization: token } });
            setUsersList(usersListData.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getUsersList();
    }, []);

    return (
        <>
                {usersList
				? (
<>
                    <p>Users received: </p>
                    {usersList.map((item) => (
<>
                    <span>
						Email:
						{ item.email }
                    </span>
                    { item.Products.map((prod) => (
<>
                        <br />
                        <t />
<span>
							Product title:
							{ prod.title }
							-
</span>
                        <t />
<span>
							Value:
							{ prod.price }
							-
</span>
</>
))}
                    <p />
</>
))}
</>
) : (
<>
                        <p>No users yet</p>
</>
)}
        </>
    );
};

export default ControlPanel;
