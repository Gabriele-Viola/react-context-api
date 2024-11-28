import { useParams, useNavigate, Link } from "react-router"
import { useEffect, useState, useContext } from "react"
import GlobalContexts from "../contexts/GlobalContexts"

export default function FocusRicetta() {
    const { fetchData, ricette } = useContext(GlobalContexts)
    const navigate = useNavigate()
    const [next, setNext] = useState(null)
    const [prev, setPrev] = useState(null)
    const [displayPrev, setDisplayPrev] = useState('')
    const [displayNext, setDisplayNext] = useState('')
    const [ricetta, setRicetta] = useState(null)
    const { slug } = useParams()

    console.log(slug);


    useEffect(() => {


        setRicetta(ricette.find(ricetta => ricetta.slug === slug))
        const indexToSet = ricette.findIndex(ricetta => ricetta.slug === slug)
        console.log(indexToSet);
        if (indexToSet + 1 == ricette.length) {
            setDisplayNext('none')
        } else {
            setNext(ricette[indexToSet + 1]?.slug)
            setDisplayNext('')
        }
        if (indexToSet - 1 == -1) {
            setDisplayPrev('none')
        } else {
            setPrev(ricette[indexToSet - 1]?.slug)
            setDisplayPrev('')
        }
        // indexToSet + 1 == ricette.length ? setDisplay('none') : setNext(ricette[indexToSet + 1]?.slug)
        // indexToSet - 1 == -1 ? setDisplay('none') : setPrev(ricette[indexToSet - 1]?.slug)

        // setNext(ricette[indexToSet + 1]?.slug || ricette[0]?.slug)

        // setPrev(ricette[indexToSet - 1]?.slug || ricette[counter - 1]?.slug)
    },
        [slug, fetchData, ricette])
    console.log(ricetta);




    return (
        <>

            {ricetta ? (

                <div className="container">
                    <Link to={`/ricette/${prev}`} style={{ display: `${displayPrev}` }} >prev</Link>

                    <div className="card">
                        <img src={`http://localhoste:3000/imgs/${ricetta.image}`} alt={ricetta.title} />
                        <h3>{ricetta.title}</h3>
                        <div className="description">
                            {ricetta.content}
                        </div>
                        <div className='tags'>
                            {ricetta.tags.map((tag, i) => <div key={i} className='tag' >{tag}</div>)}
                        </div>
                    </div>
                    <Link to={`/ricette/${next}`} style={{ display: `${displayNext}` }}>next</Link>
                    <div className="story">
                        Il ciambellone è un dolce tradizionale le cui origini affondano nelle radici della cucina popolare europea. Sebbene oggi sia diffuso in molte varianti, la sua storia inizia come preparazione semplice e rustica, nata dalla necessità di sfruttare ingredienti facilmente reperibili in ambito domestico. Il nome "ciambellone" deriva da "ciambella", un termine che si riferisce alla forma circolare caratteristica, con o senza foro centrale, e richiama antichi dolci preparati già in epoca romana. Durante il Medioevo, in molte regioni d'Europa, erano comuni dolci dalla forma circolare, spesso cotti in forni comuni del villaggio. La forma ad anello aveva anche un valore simbolico: rappresentava l'unità e la continuità. Nel tempo, il ciambellone è diventato un simbolo della cucina casalinga, grazie alla sua semplicità. Gli ingredienti di base – farina, zucchero, uova, burro (o olio) e lievito – erano facilmente reperibili, mentre l'aggiunta di aromi come limone, vaniglia, o liquori variava in base alla disponibilità locale. Il ciambellone veniva preparato soprattutto per le colazioni o come merenda, legato alle tradizioni contadine e alle famiglie numerose. Oggi il ciambellone ha assunto numerose varianti regionali in Italia e nel mondo, dalle versioni arricchite con cacao, uvetta o frutta secca a quelle più moderne senza glutine o lattosio. Nonostante l'evoluzione delle ricette, rimane un dolce che evoca il calore familiare e la semplicità della tradizione, portando avanti il gusto genuino della cucina di un tempo.
                    </div>

                </div>
            ) : (<div>loading...</div>)

            }



        </>
    )
}