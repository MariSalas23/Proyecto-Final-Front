import { useState, useEffect } from 'react';
import '../Tweet/Tweet.css';

// Componente para representar un tweet individual
// eslint-disable-next-line react/prop-types
const MyTweet = ({ username, tweet, hashtag }) => {
    return (
        <div className="container-tweet"> 
            <div className="white-container-tweet">
                <p className="user">{username}</p>
                <p className="text-tweet">{tweet}</p>
                <p className="text-hashtag">{hashtag}</p>
            </div>
            <div className="purple-container-tweet">
                <p className="edit">🖍</p>
                <p className="delete">🗑</p>
            </div>
        </div>
    );
}

// Componente para mostrar la lista de tweets del usuario logueado
const TweetsList = () => {
    const [tweets, setTweets] = useState([]);
    const [username, setUsername] = useState('');
    
    useEffect(() => {
        // Recuperar el token de localStorage
        const token = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
    
        // Hacer la solicitud GET a la API con el token de autorización
        fetch(`https://api-proyecto-beryl.vercel.app/profile/${storedUsername}`, {
            headers: {
                'Authorization': token // Incluye el token en el encabezado de autorización
            }
        })
        .then(response => response.json())
        .then(data => {
            // Si 'data' tiene una propiedad 'tweets' que es un array, establece 'tweets' en esa propiedad
            if (data && Array.isArray(data.tweets)) {
                setTweets(data.tweets);
                setUsername(data.username); // Establecer el nombre de usuario
            } else {
                console.error('Error fetching tweets: No se encontraron tweets en la respuesta de la API');
            }
        })
        .catch(error => console.error('Error fetching tweets:', error));
    }, []);
    

    return (
        <div>
            {tweets.map((tweet, index) => (
                <MyTweet
                    key={index}
                    username={username} // Pasar el nombre de usuario a cada MyTweet
                    tweet={tweet.tweet}
                    hashtag={tweet.hashtag}
                />
            ))}
        </div>
    );
};

export default TweetsList;
