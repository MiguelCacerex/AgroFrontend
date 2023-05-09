import React, { useEffect, useState } from 'react';


function SubirImagen(props) {
    
    const  [image,setImage] = useState("");

    
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        props.onSetImage([image]);
    }, [image]);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "images");

        setLoading(true);
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dv0stbo6z/image/upload",
            {
                method : "POST",
                body : data,
            }
        )
        const file = await res.json();
        setImage(file.secure_url);
        setLoading(false);
    }


    return(
        <div>

            <input style={{marginTop:'30px', marginLeft:'95px'}}
                type='file' 
                name='file' 
                placeholder='subir imagen'
                onChange={uploadImage}>
                
            </input >

            
        </div>

    );
}


export default SubirImagen;