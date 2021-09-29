import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import BreadCrumbNav from "./BreadCrumbNav";

function EditCard({refresh, setRefresh}) {
    const [deck, setDeck] = useState({});
    const { deckId = null, cardId = null } = useParams();
    const [formData, setFormData] = useState({front: "", back: ""});
    const { url } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeckAndCard(){
            try{
                const deckResponse = await readDeck(deckId, abortController.signal);
                setDeck(deckResponse);
                console.log("Deck:", deckResponse);
                const cardResponse = await readCard(cardId, abortController.signal);
                setFormData(cardResponse);
                console.log("Card:", cardResponse);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted load deck and card");
                } else {
                    throw error;
                }
            }
        }
        loadDeckAndCard();
        return () => abortController.abort();
    }, [deckId, cardId]);

    const handleFormData = (event) => {
        setFormData({...formData, [event.target.name]: [event.target.value]});
    }

    const handleSave = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        function cardUpdate() {
            try{
                updateCard({...formData}, abortController.signal);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted update card");
                } else {
                    throw error;
                }
            }
        }
        cardUpdate();
        setRefresh(!refresh);
        history.push(`/decks/${deckId}`);
        return () => abortController.abort;
    }

    return (
        <>
        <BreadCrumbNav string="Edit Card" url={url} deck={deck} cardId={cardId} />
        <h1>Edit Card</h1>
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
            Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={handleSave}>
            Save
        </button>
        </>
    );
}

export default EditCard;