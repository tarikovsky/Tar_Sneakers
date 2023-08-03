import React from 'react'

function Slide({ setCatsId, setPage }) {
    return (
        <div className='Slide'>
            <img src='/img/nigga2.jpg' alt='nigga' />
            <div className='textOnSlide'>
                <div className='topText'>
                    <h2>Z.N.E SPORTSWEAR</h2>
                    <p>Get lost in the moment with Z.N.E. For everything game day throws at you</p>
                </div>
                <ul>
                    <li onClick={() => {
                        setCatsId(2);
                        setPage(0)
                    }}
                        className="goTopText active slideButton">
                        <span>SHOP MEN</span>
                        <span>--{">"}</span>
                    </li>
                    <li onClick={() => {
                        setCatsId(1);
                        setPage(0)
                    }}
                        className="goTopText active slideButton">
                        <span>SHOP WOMEN</span>
                        <span>--{">"}</span>
                        {/* <img src="/img/arrow.svg" alt="Arrow" /> */}
                    </li>
                </ul>
            </div>
        </div >
    )
}

export default Slide