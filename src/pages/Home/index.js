import React, { useState, useEffect } from 'react';
import { PageArea, SearchArea } from './styled';
import useApi from '../../helpers/OlxAPI';
import { Link } from 'react-router-dom'
import AdItem from '../../components/partials/AdItem'

import { PageContainer } from '../../components/MainComponents';

const Page = () => {
    const api = useApi();

    const [stateList, setStateList] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates()
            setStateList(slist)
        }
        getStates()
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            const cat = await api.getCategories()
            setCategories(cat)
        }
        getCategories()
    }, [])

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            })
            setAdList(json.ads)
        }
        getRecentAds()
    }, [])

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?"/>
                            <select name="state">
                                {stateList.map((i,k)=>
                                    <option value={i.name} key={k}>{i.name}</option>
                                )}
                            </select>
                            <button>Buscar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link to={`/ads?cat=${i.slug}`} key={k} className="categoryItem">
                                <img src={i.img} alt=""/>
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,k) => 
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>

                    <hr/>

                    Lorem Ipsum is simply dummy text of the printing and 
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s
                </PageArea>
            </PageContainer>
        </>
    );

    }
export default Page;