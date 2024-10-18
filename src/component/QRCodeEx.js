import React, { useState } from "react";
import qrcode from "qrcode";
import QrReader from "react-qr-reader";


const QRCodeEx = () => {
    const [text, setText]=useState("");
    const [imageQR, setImageQR]=useState();
    const [webcamResult,setwebcamResult]= useState();

    const generateQRCode = async () => {
        const image = await qrcode.toDataURL(text);
        setImageQR(image);
    };

    const handleDownloadQRCode = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = imageQR;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    
    const webcamError = (error) => {
        if (error){
            console.log(error);
        }
    };
    
    const webcamScan = (result) => {
        if(result){
            setwebcamResult(result);
            const regex = new RegExp('^(http|https)://');
            if (regex.test(result)) {
              window.open(result, '_blank');
            }
        }
    };

    return (
        <div className="container mx-auto mt-2">
            <div className="row">
                <h2 className="col-sm-12 badges bg-danger text-center text-white">QrCode Generator</h2>
            </div>
            <div className="row">
                <h3 className="col-sm-12 ">Enter text for generating QR code  </h3> 
            </div>
            <div className="row">
                <input 
                    type="text" 
                    className="col-sm-5 m-2" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button className="col-sm-2 btn btn-primary m-1" onClick={generateQRCode}>
                    Generate QR Code
                </button>
                {imageQR && (
                    <button className="col-sm-2 btn btn-success m-1" onClick={handleDownloadQRCode}>
                        Download QR Code
                    </button>
                )}
            </div>
            <div className="row">
                <div className="card col-sm-4 m-2">
                    <div className="card-header m-1 rounded text-center">
                        <h3>QR Code Image</h3>
                    </div>
                    <div className="card-body text-center">
                        {imageQR && <img src={imageQR} width="70%" alt="qr code pic is here"/>}
                    </div>
                </div>
                <div className="card col-sm-3 m-2">
                    <div className="card-header m-1 rounded text-center">
                        <span className="btn btn-warning ">
                            <h5>Open QR Code </h5>
                        </span>
                    </div>
                    <div className="card-body text-center">
                        <img src="" alt="qr code pic is here"/>
                    </div>
                    <div className="card-footer rounded mb-1">
                        <h6>Scan Result:</h6>
                    </div>
                </div>
                <div className="card col-sm-4 m-2">
                    <div className="card-header m-1 rounded text-center">
                        <h3>Webcam Image</h3>
                    </div>
                    <div className="card-body text-center">
                        <QrReader
                            
                            delay={300}
                            onError={webcamError}
                            onScan={webcamScan}
                            legacyMode={false}
                            facingMode={"user"}
                            />
                    </div>
                    <div className="card-footer rounded mb-1">
                        <h6>WebCam Result: {webcamResult}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRCodeEx;
