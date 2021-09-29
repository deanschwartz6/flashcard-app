import React, { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api";
import BreadCrumbNav from "./BreadCrumbNav";
import EditForm from "./EditForm";

function EditDeck() {
    const [deck, setDeck] = useState({});
    const { deckId = null } = useParams();
    const { url } = useRouteMatch();

    useEffect(() => {
        const abortController = new AbortController();
        if (deckId !== null){
            async function loadDeck() {
                try{
                    const response = await readDeck(deckId, abortController.signal);
                    setDeck(response);
                    console.log("Fetched", response);
                } catch(error){
                    if (error === "AbortError"){
                        console.log("Aborted loadDeck");
                    } else {
                        throw error;
                    }
                }
            }
            loadDeck();
        }
        return () => abortController.abort();
    }, [deckId]);

    return (
        <>
        <BreadCrumbNav string="Edit Deck" deck={deck} url={url}/>
        <h1>Edit Deck</h1>
        <EditForm deck={deck} setDeck={setDeck} deckId={deckId}/>
        </>
    );
}

export default EditDeck;