import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react'; 
import { useParams } from 'react-router-dom';

const QR_generator = () => {
    const { name } = useParams();
    const [showQRCode, setShowQRCode] = useState(false);

    const handleButtonClick = () => {
        setShowQRCode(true);
    };

    return (
        <div>
            <button 
                className='duration-100 rounded-xl border-2 border-black px-5 py-2 hover:border-2 hover:scale-110 hover:bg-white hover:text-black  bg-blue-500 border-0 text-white'
                onClick={handleButtonClick} 
            >
                Profile QR-Code
            </button>
           <div className='mt-4'>
           {showQRCode && ( 
                <QRCodeSVG value={`http://localhost:3000/user/${name}`} size="256" />
            )}
           </div>
        </div>
    );
};

export default QR_generator;
