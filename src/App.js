import React, {useEffect, useRef, useState} from 'react';
import {ACCESS_KEY, API_URL} from './credentials';
import axios from 'axios';
import './App.css';
import Pagination from "./components/pagination";

function App() {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);
    const [query, setQuery] = useState('')


    const fetchImages = () => {
        axios.get(`${API_URL}/photos/?client_id=${ACCESS_KEY}&per_page=10&page=${page}`)
            .then(res => setImages([...images, ...res.data]));
    };

    const searchImages = () => {
        axios.get(`${API_URL}/search/photos/?client_id=${ACCESS_KEY}&per_page=10&page=${page}&query=${query}`)
            .then(res => setImages([...images, ...res.data.results]));
    };

    const handleObserver = entities => {
         const target = entities[0];

        /*if (target.intersectionRatio > 0) {
            setPage(page => page + 1)
        }*/
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
    }, [])

    useEffect(() => {
        if (query) {
            searchImages();
        } else {
            fetchImages();
        }
    }, [page, query]);

    const handleClick =  (newQuery) => {
        if(newQuery !== query){
            setImages([]);
            setPage(1);
        }
        setQuery(newQuery);
        setQuery(newQuery);
    }

    const totalPages = 10;

   const handlePaginationClick = (nextPage) => {
        console.log("click page #" + nextPage)
       setImages([]);
       setPage(nextPage)
    }

    return (
        <div className="container">
            <header className="header">
                <h1>Fancy Gallery</h1>
            </header>
            <div className="tags">
                <button onClick={()=>handleClick('cats')}>Cats</button>
                <button onClick={()=>handleClick('dogs')}>Dogs</button>
                <button onClick={()=>handleClick('react')}>React</button>
                <button onClick={()=>handleClick('')}>Random</button>
            </div>
            <Pagination
                lastPage={totalPages}
                handlePaginationClick={handlePaginationClick}
                currentPage={page}
            />
            <div className="image-grid">
                {images.map(image => {
                    const {id, alt_description, urls, color} = image;
                    return (
                        <div className="image-item" key={id} style={{backgroundColor: color}}>
                            <img src={urls.small} alt={alt_description}/>
                        </div>)
                })}
            </div>
            <div ref={loader}>Loading...</div>
        </div>
    );
}

export default App;
