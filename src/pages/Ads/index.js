import React, { useState, useEffect } from 'react';
import {PageArea} from './styled';

import useApi from '../../helpers/OlxAPI';

import {PageContainer } from '../../components/MainComponents';
import { useLocation,useHistory } from 'react-router-dom';
import AdItem from '../../components/partials/AdItem';

let timer;
const Page = () =>{

    const api = useApi();
    const history = useHistory();   

    const useQueryString = () =>{
        return new URLSearchParams( useLocation().search);
    }

    const query =   useQueryString();

    const [q, setQ] = useState( query.get('q') !=null ? query.get('q') : '' );
    const [cat, setCat] = useState(query.get('cat') !=null ? query.get('cat') : '' );
    const [state, setState] = useState(query.get('state') !=null ? query.get('state') : '' );

    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    const [resultOpacity, setResultOpacity] = useState(1);

    const getAdsList = async () =>{
        const json = await api.getAds({
            sort:'desc',
            limit:9,
            q,
            cat,
            state
        });
        setAdList(json.ads);
        setResultOpacity(1);
    }

    useEffect(()=>{

        let queryString = [];
        if(q){
            queryString.push(`q=${q}`);
        }
        if(cat){
            queryString.push(`cat=${cat}`);
        }
        if(state){
            queryString.push(`state=${state}`);
        }

        history.replace({
            search:`?${queryString.join('&')}`
        });

        if(timer){
            clearTimeout(timer);            
        }
        timer = setTimeout(getAdsList,1000);
        setResultOpacity(0.3);
    },[q,cat,state]);

    
    useEffect(()=>{
        const getStates = async () =>{
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);

    useEffect(()=>{
        const getCategories = async () =>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[]);


    

    return(
       
        <PageContainer>
                <PageArea>
                    <div className="leftSide">
                       <form method="GET">
                            <input  
                                type="text" 
                                name="q" 
                                placeholder="O que você procura?" 
                                value={q}
                                onChange={e=>setQ(e.target.value)}
                            />
                            <div className="filterName">Estado:</div>
                            <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                                <option></option>
                                {stateList.map((i,k)=>
                                    <option key={k} value={i.name}>{i.name}</option>
                                )}
                            </select>

                            <div className="filterName">Categoria:</div>
                            <ul>
                                { categories.map((i,k)=>
                                    <li 
                                        key={k} 
                                        className={cat == i.slug?'categoryItem active' : 'categoryItem'}
                                        onClick={()=>setCat(i.slug)}
                                    >
                                        <img src={i.img} alt/>
                                        <span>{i.name}</span>
                                    </li>
                                )}
                            </ul>
                       </form>
                    </div>
                    <div className="rightSide">
                        <h2>Resultados</h2>
                        <div className="list" style={{opacity:resultOpacity}}>
                            {adList.map((i,k)=>
                                <AdItem key={k} data={i}/>
                            )}
                        </div>
                    </div>
                </PageArea>
        </PageContainer>
        
    );
}

export default Page;