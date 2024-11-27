import { Link } from 'react-router'
import AppCard from '../Components/AppCard'
// import AppForm from '../Components/AppForm'
import { useState, useEffect, useContext } from 'react'
import GlobalContexts from '../contexts/GlobalContexts';


export default function Ricette() {
    const { il_server, il_endpoint, allRecipes } = useContext(GlobalContexts)
    console.log(il_server, il_endpoint, allRecipes);
    const [ricette, setRicette] = useState(allRecipes)
    const [allTags, setAllTags] = useState([])
    function fetchData(url = `${il_server}${il_endpoint}`) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                setRicette(data.data)
            })
    }
    const url = il_server + il_endpoint



    function handleDeleteClick(e) {
        e.preventDefault()
        const id = e.target.getAttribute('slug')
        console.log(url + id);

        fetch(url + id, {
            method: 'DELETE',
            headers: {
                'ContentType': 'application/json'
            }
        }).then(res => res.json())
            .then(data => {

                setRicette(data.data)
            })
    }
    useEffect(fetchData, [])

    return (

        <div className="container">
            <Link to='addricetta'>
                <i className="bi bi-plus-circle"></i>
            </Link>
            {/* <section className='operationSect'>
                <AppForm handleFormSubmit={handleFormSubmit} formData={formData} handleFormfield={handleFormfield} allTags={allTags} />
            </section> */}
            <section>
                {ricette ? ricette.map(ricetta => (
                    <AppCard url={`${il_server}${il_endpoint}`} key={ricetta.title} ricetta={ricetta} server={il_server} handleDeleteClick={handleDeleteClick} />
                )) :
                    <p>Nessuna ricetta trovata</p>}

            </section>
        </div>

    )
}