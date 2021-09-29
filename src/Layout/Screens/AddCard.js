import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import BreadCrumbNav from "./BreadCrumbNav";

function AddCard() {
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({front: "", back: ""});
    const { url } = useRouteMatch();
    const { deckId } = useParams();

    const handleFormData = (event) => {
        setFormData({...formData, [event.target.name]: [event.target.value]});
    }

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                console.log("Fetched", response);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted Load Deck");
                } else {
                    throw error;
                }
            }
        }
        loadDeck();
        return () => abortController.abort();   
    }, [deckId]);

    const handleSave = () => {
        const abortController = new AbortController();
        async function cardCreate() {
            try{
                const response = await createCard(deckId, formData, abortController.signal);
                console.log("Response:", response);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted Create Card");
                } else {
                    throw error;
                }
            }
        }
        cardCreate();
        setFormData({front: "", back: ""});
        return () => abortController.abort();
    }

    return (
        <>
        <BreadCrumbNav string="Add Card" url={url} deck={deck} />
        <h1>{deck.name}: Add Card</h1>
        <div className="form-group">
            <label className="d-flex col">Front</label>
            <textarea
                className="d-flex col"
                placeholder="Front side of Card"
                name="front"
                value={formData.front}
                onChange={handleFormData}
            />
        </div>
        <div className="form-group">
            <label className="d-flex col">Back</label>
            <textarea
                className="d-flex col"
                placeholder="Back side of Card"
                name="back"
                value={formData.back} 
                onChange={handleFormData} 
            />
        </div>
        <Link type="button" className="btn btn-secondary m-1" to={`/decks/${deckId}`}>
            Done
        </Link>
        <button className="btn btn-primary m-1" onClick={handleSave}>
            Save
        </button>
        </>
    );
}

export default AddCard;