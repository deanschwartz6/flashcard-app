import React from "react";
import { useHistory, Link } from "react-router-dom";
import { updateDeck } from "../../utils/api";

function EditForm({deck, setDeck, deckId}) {
    const history = useHistory();
    const handleInput = (event) => {
        setDeck({...deck, [event.target.name]: [event.target.value]})
    };
    const updateHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        function deckUpdate(){
            try{
                updateDeck({...deck}, abortController.signal);
                console.log("Updated", deck);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted Creation of New Deck");
                } else {
                    throw error;
                }
            }
        }
        deckUpdate();
        history.push(`/decks/${deckId}`);
        return () => abortController.abort();
    };

    return (
        <>
        <form>
            <div className="form-group">
                <label className="d-flex col">
                    Name
                </label>
                <input
                    className="d-flex col"
                    placeholder="Deck Name"
                    name="name"
                    value={deck.name}
                    onChange={handleInput}
                />
            </div>
            <div className="form-group">
                <label className="d-flex col">
                    Description
                </label>
                <textarea
                    className="d-flex col"
                    placeholder="Brief description of the deck"
                    name="description"
                    value={deck.description}
                    onChange={handleInput}
                />
            </div>
        </form>
        <Link type="button" className="btn btn-secondary m-1" to={`/decks/${deckId}`}>
            Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={updateHandler} >
            Update
        </button>
        </>
    );
}

export default EditForm;