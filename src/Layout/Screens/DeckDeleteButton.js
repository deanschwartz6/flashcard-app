import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api"

function DeckDeleteButton({ refresh, setRefresh, deckId }) {
    const history = useHistory();
    const handleDelete = () => {
        const abortController = new AbortController();
        const popUp = "Delete this deck forever?"
        if (window.confirm(popUp)) {
            try{
                deleteDeck(deckId, abortController.signal);
            } catch (error) {
                if (error === "AbortError"){
                    console.log("Aborted Delete of Deck:", deckId);
                } else {
                    throw error;
                }
            }
            setRefresh(!refresh);
            history.push("/");
        }
        return () => {
            console.log("Cleanup Done")
            abortController.abort();
        }
    };

    return (
        <div>
            <button type="button" className="btn btn-danger m-1" onClick={handleDelete} >
                <span className="oi oi-trash m-1" />
            </button>
        </div>
    );
}

export default DeckDeleteButton;