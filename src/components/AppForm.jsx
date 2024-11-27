import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
export default function AppForm() {

    const api_server = 'http://localhost:3000'
    const api_endpoint = '/ricette/'

    const url = api_server + api_endpoint
    const initialFormData = {
        title: '',
        content: '',
        image: '',
        tags: [],
        checked: false
    }
    const navigate = useNavigate()
    const [formData, setFormData] = useState(initialFormData)
    const [allTags, setAllTags] = useState([])
    const [checktags, setTags] = useState(initialFormData.tags)

    function fetchData(url = `${api_server}${api_endpoint}`) {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setAllTags([...new Set(data.data.flatMap(item => Object.values(item).filter(value => Array.isArray(value)).flat()))])
            })
    }

    function handleFormSubmit(e) {
        e.preventDefault()

        console.log(formData);
        const newRicetta = {
            slug: Date.now().toString(),
            ...formData
        }
        console.log(newRicetta);


        fetch(url, {
            method: 'POST',
            body: JSON.stringify(newRicetta),
            headers: {
                'Content-Type': 'Application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log('success:', data);

                navigate('/ricette')
            })
        setFormData(initialFormData)
    }
    function handleFormfield(e) {
        const { type, name, id, checked, value } = e.target;

        if (type === 'checkbox') {
            setTags((prevTags) =>
                checked ? [...prevTags, id] : prevTags.filter(tag => tag !== id)
            );

            setFormData({
                ...formData,
                tags: checked
                    ? [...formData.tags, id]
                    : formData.tags.filter(tag => tag !== id),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    }

    useEffect(fetchData, [])
    return (

        <div className="container">
            <form className='formstyle' onSubmit={handleFormSubmit}>
                <div className="titleFormStyle">
                    <label htmlFor="title">Nome ricetta</label>
                    <input
                        type="text"
                        name='title'
                        id='title'
                        value={formData.title}
                        onChange={handleFormfield} />

                    <label htmlFor="image">Immagine</label>
                    <input
                        type="text"
                        name='image'
                        id='image'
                        value={formData.image}
                        onChange={handleFormfield} />
                </div>

                <div className="inputstyle">

                    <label htmlFor="content">Descrizione</label>
                    <textarea
                        type="textarea"
                        rows="4"
                        cols="80"
                        name='content'
                        id='content'
                        value={formData.content}
                        onChange={handleFormfield}
                        placeholder="Descrivi la tua ricetta..." />
                </div>
                <div className="checktags">

                    {allTags.map((tag, index) =>

                        <div key={index} className="inputstyletags">
                            <label className='tagLabel' htmlFor={tag}>{tag}

                                <input className='tagcheck' type="checkbox" name={tag} id={tag} checked={formData.tags.includes(tag)} value={formData.name} onChange={handleFormfield} />
                            </label>
                        </div>
                    )}


                </div>
                <div className="buttoncontain">

                    <button type='submit'>Aggiungi ricetta</button>
                </div>
            </form>
        </div>

    )
}