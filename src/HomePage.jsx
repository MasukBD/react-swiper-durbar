import React, { useEffect, useState } from 'react';
import { FaCheese } from 'react-icons/fa';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';

const HomePage = () => {
    const [seeMoreDes, setSeeMoreDes] = useState(true);
    let [count, setCount] = useState(0);
    const [content, setContent] = useState([]);


    useEffect(() => {
        fetch('/content.json')
            .then(res => res.json())
            .then(data => setContent(data))
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count === content.length) {
                count = 0;
            }
            setCount(count++);
        }, 2000);
        return () => clearInterval(interval);
    }, [content, count]);


    return (
        <div className='bg-[#1C1A27] min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-9'>
            <div className='overflow-hidden'>
                <Swiper
                    effect={'coverflow'}
                    centeredSlides={true}
                    grabCursor={true}
                    loop={true}
                    autoplay={{
                        delay: 3600,
                        disableOnInteraction: false,
                    }}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                    }}
                    modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
                >
                    {
                        content?.map((c, i) => <SwiperSlide key={i}><img className='w-1/2 md:w-1/2 mx-auto rounded-xl' src={count == i ? content[count].image : c.image} alt="" /></SwiperSlide>)
                    }
                </Swiper>
            </div>
            <div className='text-white space-y-4'>
                <h3 className='text-2xl font-bold uppercase'>Food Items</h3>
                <h1 className='text-4xl font-bold uppercase'>{content[count]?.name}</h1>
                <div className='flex justify-between border-y-2 py-4 font-semibold '><span>Most Popular Item In Town</span><p><span className='bg-yellow-500 p-2 rounded-md text-black font-bold font-serif'>Ratings</span><span className='ms-5'>5.0</span></p></div>
                <p><span>{seeMoreDes ? content[count]?.description.substring(0, 210) : content[count]?.description}{seeMoreDes ? '...' : " "}</span>{seeMoreDes ? <button onClick={() => setSeeMoreDes(!seeMoreDes)} className='text-yellow-500 font-medium'>Read More</button> : <button className='text-yellow-500 font-medium' onClick={() => setSeeMoreDes(!seeMoreDes)}>Read Less</button>}</p>
                <button className='p-2 bg-yellow-500 text-white font-semibold rounded-md flex gap-2 items-center'>See Menu <FaCheese></FaCheese></button>
            </div>
        </div>
    );
};

export default HomePage;