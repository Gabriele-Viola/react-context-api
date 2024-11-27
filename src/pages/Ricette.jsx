import { Link } from 'react-router'
import AppCard from '../Components/AppCard'
// import AppForm from '../Components/AppForm'
import { useState, useEffect, useContext } from 'react'
import GlobalContexts from '../contexts/GlobalContexts';


export default function Ricette() {
    const { api_server, api_endpoint, fetchData, ricette, setRicette, urlRicette } = useContext(GlobalContexts)
    console.log(api_server, api_endpoint);

    function handleDeleteClick(e) {
        e.preventDefault()
        const id = e.target.getAttribute('slug')
        console.log(e.target);


        fetch(urlRicette + id, {
            method: 'DELETE',
            headers: {
                'ContentType': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);

                setRicette(data.data)
            })
    }
    useEffect(fetchData, [])

    return (

        <div className="container">
            <Link to='addricetta'>
                <i className="bi bi-plus-circle"></i>
            </Link>
            <section>
                {ricette ? ricette.map(ricetta => (
                    <AppCard url={`${api_server}${api_endpoint}`} key={ricetta.title} ricetta={ricetta} server={api_server} handleDeleteClick={handleDeleteClick} />
                )) :
                    <p>Nessuna ricetta trovata</p>}

            </section>
        </div>

    )
}