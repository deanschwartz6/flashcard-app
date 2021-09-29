import React, { useState, useEffect } from "react";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import BreadCrumbNav from "./BreadCrumbNav";
import { readDeck } from "../../utils/api";
import DeckDeleteButton from "./DeckDeleteButton";
import CardDeleteButton from "./CardDeleteButton";

function Deck({refresh, setRefresh}) {
    const [deck, setDeck] = useState({});
    const {deckId = null} = useParams();
    const {url} = useRouteMatch();
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
            } catch(error){
                if(error === "AbortError"){
                    console.log("Aborted Load Deck");
                } else {
                    throw error;
                }
            }
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId, refresh]);

    if(deck.cards === undefined){
        return null;
    } else {
        return (
            <>
            <BreadCrumbNav string="Deck" deck={deck}/>
            <h3>{`${deck.name}`}</h3>
            <p className>{`${deck.description}`}</p>
            <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-around">
                    <Link type="button" className="btn btn-secondary m-1" to={`${url}/edit`} >
                        <span className="oi oi-pencil m-1" />Edit
                    </Link>
                    <Link type="button" className="btn btn-primary m-1" to={`${url}/study`}>
                        <span className="oi oi-book m-1" />Study
                    </Link>
                    <Link type="button" className="btn btn-primary m-1" to={`${url}/cards/new`}>
                        <span className="oi oi-plus m-1" />Add Cards
                    </Link>
                </div>
                <div>
                    <DeckDeleteButton deckId={deck.id} refresh={refresh} setRefresh={setRefresh} />
                </div>
            </div>
            <div style={{ paddingTop: "3%" }}>
                <h2>Cards</h2>
            </div>
            {deck.cards.map(({ id, front, back }) => (
            <   div className="card m-2" key={id}>
                    <div className="card-body">
                        <div className="card-subtitle d-flex justify-content-between">
                            <p className="d-flex col-6">{front}</p>
                            <p className="d-flex col-6">{back}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Link type="button" className="btn btn-secondary m-1" to={`${url}/cards/${id}/edit`}>
                                <span className="oi oi-pencil m-1" />Edit
                            </Link>
                            <CardDeleteButton cardId={id} refresh={refresh} setRefresh={setRefresh} />
                        </div>
                    </div>
                </div>
            ))}
            </>
        );
    }
}

export default Deck;