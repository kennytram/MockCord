import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import UserBar from '../UserBar/UserBar';
import FriendsContent from '../FriendsContent/FriendsContent';
import { fetchUsers } from '../../store/users';
import { fetchServers, joinServer } from '../../store/servers';
import './HomePage.css';

function HomePage() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        Promise.all([
            dispatch(fetchUsers())
        ]).then(() => {
            setLoaded(true);
        });
    }, [dispatch]);
    return (
        <div className="home-page">
            <NavBar />
            <UserBar/>
            <FriendsContent/>
        </div>
    )
}

export default HomePage;