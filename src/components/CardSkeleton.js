import React from 'react'

const CardSkeleton = () => {
  return (
    <div className="cardSkeleton">
            <div className="white favorite"></div>
            <div>
                <div className="white name"></div>
            </div>
            <div className='bottomSkeleton'>
                <div>
                    <div className="white priceName"></div>
                    <div className="white price"></div>
                </div>
                <div className="white plus"></div>
            </div>
        </div>
  )
}

export default CardSkeleton