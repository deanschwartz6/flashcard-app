import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../../utils/api";
import DeckDeleteButton from "./DeckDeleteButton";

function DecksHomeView() {
    const [deckList, setDeckList] = useState();
    const [refresh, setRefresh] = useState(false);

    
    useEffect(() => {
        setDeckList([]);
        const abortController = new AbortController();
        async function LoadDecks() {
            try{
                const response = await listDecks(abortController.signal);
                setDeckList(response);
                console.log("Data Retreived", response);
            } catch(error) {
                if (error === "AbortError"){
                    console.log("Abort Error", error);
                } else {
                    throw error;
                }
            }
        }
        LoadDecks();
        return  () => {
            console.log("CleanUp")
            abortController.abort();
        }
    }, [refresh]);


    if (!deckList){
        return null;
    } else {
        return (
            <>
            {deckList.map(({ id, name, description, cards }) => (
                <div className="card m-2" key={id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{name}</h5>
                      <h6 className="card-quote">{`${cards.length} cards`}</h6>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{description}</h6>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex justify-content-around">
                        <Link type="button" className="btn btn-secondary m-1" to={`/decks/${id}`}>
                          <span className="oi oi-eye m-1" />
                          View
                        </Link>
                        <Link type="button" className="btn btn-primary m-1" to={`/decks/${id}/study`}>
                          <span className="oi oi-book m-1" />
                          Study
                        </Link>
                      </div>
                      <div>
                        <DeckDeleteButton deckId={id} refresh={refresh} setRefresh={setRefresh} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
        );
    }
}

export default DecksHomeView;