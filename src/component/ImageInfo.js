import React from 'react';

const ImageInfo = (props) => {

    const  [source, setSource] = React.useState();
    const [currentFile , setCurrent] = React.useState({nom: ''});

    const handleClick = (ev) => {
        setCurrent({nom: ev.target.name});
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/newLink/readFile/", true );
        xhr.responseType = "arraybuffer";
        
        xhr.onreadystatechange = function(ev){
            if(xhr.readyState === 4){
                // create blob file xhr.response which came from server
                const blob  = new Blob([xhr.response], {type:'image/jpg'});
                
                // now let us create link (url ) from blob file
                const url = window.URL.createObjectURL(blob);
                // let us change ower source state to change source of ower image
                setSource(url);
            }
        }
        xhr.setRequestHeader('Content-Type','Application/json');
        // send informations
        xhr.send(JSON.stringify({ foldName: ev.target.name , filePath: ev.target.id }));

    }

   
    return <div className="d-flex flex-column justify-content-center align-items-center">
        { source !== undefined && <div style={{ margin: "1rem auto" }}>
            <img id="myImage" src={source} width= "800" height="400" alt="myImage" />
            <h5 className="font-weight-bold text-primary display-5">{currentFile.nom}</h5>
        </div>}
        <div className="d-flex justify-content-around mt-3">
            {props.files.map(function(file){
                return <div key={file.nom} className="card mr-2">
                    <div className="card-body p-2">
                        <div className="card-title p-2">{file.nom} </div>
                        <button name={file.nom} id={file.filePath} onClick={handleClick} className="btn btn-outline-info btn-xs">Voire</button>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default ImageInfo;