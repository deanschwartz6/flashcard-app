import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";


function Form() {
    const [newDeck, setNewDeck] = useState({ name: "", description: "" });
    const history = useHistory();
    const handleInput = (event) => {
        setNewDeck({...newDeck, [event.target.name]: [event.target.value]})
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        async function submitDeck(){
            try{
                const data = await createDeck({...newDeck}, abortController.signal);
                console.log("Submitted", newDeck);
                history.push(`/decks/${data.id}`);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted Creation of New Deck");
                } else {
                    throw error;
                }
            }
        }
        submitDeck();
        setNewDeck({name: "", description: ""});
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
                    value={newDeck.name}
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
                    value={newDeck.description}
                    onChange={handleInput}
                />
            </div>
        </form>
        <Link type="button" className="btn btn-secondary m-1" to="/" >
            Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={submitHandler} >
            Submit
      </button>
      </>
    );
}

export default Form;