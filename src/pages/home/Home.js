import './style.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingEffect from './LoadingEffect';

function Filter({filterText, setFilterText, setTextSearch, setPage}) {

    const setOnChangeFilterText = (e) => {
        setFilterText(e.target.value)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        // handle api sau đó set list images
        setTextSearch(filterText)
        setPage(1)
    }

    return(
        <div className='filter'>
            <form onSubmit={handleOnSubmit} className='formSearch'>
                <input
                    type='text'
                    className='inputFilter'
                    value={filterText} 
                    onChange={(e) => setOnChangeFilterText(e)}
                    />

                <button 
                    type='submit'
                    className='btnSubmit'>Search</button>
            </form>
            
        </div>
    );
}

function Images({listImages}) {
    console.log(listImages)
    return(
        <div className='containerListImages'>
            <div className='listImages'>
                {listImages.map((img) => {
                    return (
                        <div className='contImg' key={img.urls.raw}>
                            <img className='img' src={img.urls.raw}/>
                        </div>
                    )
                        

                })}
            </div>
        </div>
        
    )
}

function Home () {
    const ACCESS_KEY = "9MZVU1g_HmEH1tdhh7PRW7oXrtO64CVDnlIKJ2Ju-JM"

    const [filterText, setFilterText] = useState('')
    // filter text là mỗi khi thay đổi input search

    const [textSearch, setTextSearch] = useState('random')
    // textSearch được update mỗi khi click nút search hoặc enter
    const [oldTextSearch, setOldTextSearch] = useState('random')

    const [page, setPage] = useState(1)
    const [listImages, setListImages] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    
    

    useEffect(() => {
        const fetch = async () =>{
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=${page}&per_page=10&query=${textSearch}&client_id=${ACCESS_KEY}`)
            const result = response.data.results  
            
            if(oldTextSearch != textSearch){
                setListImages( result)
            }else{
                setListImages([...listImages, ...result])
            }
            setIsLoading(false)
        }
       
        
        fetch()
    }, [textSearch, page])

    // dùng để tạo event listener scroll
    const handleScroll = () => {
        const scrollY = window.scrollY; // Lấy vị trí cuộn theo trục Y
        const windowHeight = window.innerHeight; // Chiều cao của cửa sổ trình duyệt
        const documentHeight = document.documentElement.scrollHeight; // Chiều cao của tài liệu trang

        // Kiểm tra xem bạn đã cuộn đến cuối trang hay chưa
        if (scrollY + windowHeight >= documentHeight) {
            // Cuộn đến cuối trang
            const newPage = page + 1
            
            setIsLoading(true)
            setTimeout(() => {
                setPage(newPage)
            }, 2000);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return ( 
        <div id='home'>
            <Filter filterText={filterText} setFilterText={setFilterText} setTextSearch={setTextSearch} setPage={setPage}/>
            <Images listImages={listImages}/>

            {isLoading ? <LoadingEffect /> : ''}
        </div>
     );
}

export default Home ;