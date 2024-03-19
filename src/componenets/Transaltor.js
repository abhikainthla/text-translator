import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaRegCopy } from "react-icons/fa6";
function Translator() {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('hi');
    const [textToTranslate, setTextToTranslate] = useState('What can i do for you?');
    const [translatedText, setTranslatedText] = useState("");
    const [copy, setCopy] = useState("")
    useEffect(() => {
        getLanguages();
        getTranslatedText();
    }, []);

    async function getLanguages(){
        const options = {
            method: 'GET',
            url: 'https://text-translator2.p.rapidapi.com/getLanguages',
            headers: {
              'X-RapidAPI-Key': 'e82d5c875dmshcfd6aec909d5a84p156141jsna0e2ee391f05',
              'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setLanguages(response.data.data.languages);
          } catch (error) {
              console.error(error);
          }
    }

    async function getTranslatedText() {
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', 'en');
        encodedParams.set('target_language', selectedLanguage);
        encodedParams.set('text', textToTranslate );
        
        const options = {
          method: 'POST',
          url: 'https://text-translator2.p.rapidapi.com/translate',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e82d5c875dmshcfd6aec909d5a84p156141jsna0e2ee391f05',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
          },
          data: encodedParams,
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
            setTranslatedText(response.data.data.translatedText);
        } catch (error) {
            console.error(error);
        }
}

    function handleLanguageChange(event) {
        setSelectedLanguage(event.target.value);
    }
    function handleTranslation(e){
        setTextToTranslate(e.target.value)
    }
    function handleTranslate(){
        getTranslatedText();
    }
    function handleCopy(){
        navigator.clipboard.writeText(translatedText);
        setCopy("copied"); 
        setTimeout(() => {
           setCopy(""); 
        }, 1000);
    }
    return (
        <div className='container'>
            <div className='main'>
            <div className='input-area'> 
            <textarea onChange={handleTranslation} value={textToTranslate}></textarea>
            <label>Translate to:</label>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
                {
                    languages.map((item, index)=>{
                        return <option key={index} value={item.code} >{item.name}</option>;
                    })
                }
            </select>
            </div>
            <div>
            <p>{translatedText}   <button className='copy' onClick={handleCopy}><FaRegCopy /></button><span>{copy}</span></p> 
            </div>
            
            <button className='btn' onClick={handleTranslate}>Translate</button>
        </div>
        </div>
    );
}

export default Translator;
