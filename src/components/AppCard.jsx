import { useState } from "react";
import { Link } from "react-router";

export default function AppCard({ ricetta, server, handleDeleteClick }) {

    return (
        <div className='card'>
            <h3>{ricetta.title}</h3>
            <div className="imagcont">
                <Link to={`/ricette/${ricetta.slug}`}>
                    <img src={`${server}/imgs/${ricetta.image}`} alt="" />
                </Link>
            </div>
            <div className='description'>{ricetta.content}</div>
            <div className='tags'>

                {ricetta.tags.map((tag, index) => <div key={index} className='tag' >{tag}</div>)}
            </div>
            <div className="bottoncontain" onClick={handleDeleteClick} >
                <button slug={ricetta.slug} ><i slug={ricetta.slug} className="bi bi-trash-fill"></i></button>

            </div>
        </div>
    )
}