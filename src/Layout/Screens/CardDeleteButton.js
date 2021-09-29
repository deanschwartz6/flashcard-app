import React from "react";
import { deleteCard } from "../../utils/api";

function CardDeleteButton({cardId, refresh, setRefresh}){
    const handleDelete = () => {
        const abortController = new AbortController();
        const prompt = "Delete this card forever?";
        if (window.confirm(prompt)){
            try{
                deleteCard(cardId, abortController.signal);
            } catch(error){
                if (error === "AbortError"){
                    console.log("Aborted Delete");
                } else {
                    throw error;
                }
            }
            setRefresh(!refresh);
        }
        return () => abortController.abort();
    }

    return (
        <>
        <button type="button" className="btn btn-danger m-1" onClick={handleDelete}>
            <span className="oi oi-trash m-1" />
        </button>
        </>
    );
}

export default CardDeleteButton;