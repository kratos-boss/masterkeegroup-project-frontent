import React from 'react';
import { useParams } from 'react-router-dom';
import ImageInfo from '../component/ImageInfo';
import VideoInfo from '../component/VideoInfo';

const PrivateFiles = () => {
    const linkId = useParams();
    const [link, setLink] = React.useState({files:[]});
    
    const  findLinkId = ()=> {
        fetch('/newLink/info/'+ linkId.url,{
            method: "GET",
            headers: {
                'Content-Type': 'Application/json',
            }
        }).then(function(response){
            return response.json();
        }).then(function(data){
            if(data.errors)
                throw data.message
           console.log(data);
            return setLink(data.link);
        }).catch(function(err){
            return console.log(err)
        })
    }

    React.useEffect(function(){
        findLinkId();
    }, []);

    const displaysInfo = () => {
        if(link.files.length > 0){
            if(link.type === "images"){
                return <ImageInfo files={link.files } />;
            }
            if(link.type === "videos"){
                return <VideoInfo files={link.files} />;
            }
            if(link.type === "musics"){
                return console.log("ce fichier est de type musique");
            }
        }

        return <h4 className="font-weight-bold text-center text-danger"> Ce fichier n'exist plus !</h4>
       
    }

    return <div className="container">
                { displaysInfo() }
        </div>
}

export default PrivateFiles;