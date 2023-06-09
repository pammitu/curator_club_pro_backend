import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Library() {
    const [galleries, setGalleries] = useState([]);

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                
                const response = await axios.get('https://curator-club-pro.herokuapp.com/api/galleries');
                setGalleries(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGalleries();
    }, []);

    return (
        <div>
            <h1>My Galleries</h1>
            {galleries.map((gallery) => (
                <Gallery key={gallery._id} gallery={gallery}/>
            ))}
        </div>
    );
}

export default Library;