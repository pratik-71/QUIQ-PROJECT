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
                className='rounded-xl border-2 border-black px-3 py-1 '
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
