import React, { useState, useEffect } from "react";
import BreadCrumbNav from "./BreadCrumbNav";
import { useParams, useRouteMatch, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

function Study() {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState({
        stack: [],
        currentCard: 0,
        deckLength: 0,
        side: "front",
        flip: false,
    });
    let content ="default";
    const {deckId} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try{
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                console.log("Fetched", response);
                setCards((current) => (current = {...current, stack: response.cards, deckLength: response.cards.length}));
            } catch(error) {
                if (error === "AbortError"){
                    console.log("Aborted Load Deck");
                } else {
                    throw error;
                }
            }
        }
        loadDeck();
        return () => {
            console.log("Cleanup Start");
            abortController.abort();
        };
    }, [deckId]);

    const handleFlip = () => {
        if (cards.side === "front") {
          setCards((current) => (current = {...current, flip: !current["flip"], side: "back",}));
        } else {
          setCards((current) => (current = {...current, flip: !current["flip"], side: "front",}));
        }
    };
    const handleNext = () => {
        if (cards.currentCard < cards.deckLength) {
            setCards((current) => (current = {...current, currentCard: current.currentCard++, side: "front", flip: !current["flip"]}));
            if (cards.currentCard === cards.deckLength - 1 && cards.flip) {
                const message = "Restart Deck?";
                const result = window.confirm(message); 
                {result
                    ? setCards((current) => ({ ...current, currentCard: 0 }))
                    : history.push("/")}
            }
        }
    };
    if(cards.flip) {
        if (cards.deckLength !== 0){
            content = cards.stack[cards.currentCard].back;
        }
    } else if (cards.deckLength !== 0){
            content = cards.stack[cards.currentCard].front;
    }

    if (cards.deckLength < 3){
        return (
            <>
                <BreadCrumbNav string="Study" deck={deck} url={url} />
                <div>
                    <h1>Study: {deck.name}</h1>
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">
                                Not enough cards
                            </h6>
                            <p className="card-text">
                                You need at least 3 cards to study. There are {cards.deckLength} in this deck.
                            </p>
                            <Link  className="btn btn-primary" to="/decks/new" >
                                Add Cards
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <BreadCrumbNav string="Study" deck={deck} url={url} />
                <div>
                    <h1>Study: {deck.name}</h1>
                    <div className="card">
                        <div className="card-body" >
                            <h6 className="card-subtitle mb-2 text-muted">
                                Card {cards.currentCard + 1} of {cards.deckLength}
                            </h6>
                            <p className="card-text">
                               {content}
                            </p>
                            <button type="button" className="btn btn-secondary" onClick={handleFlip}>
                                Flip
                            </button>
                            <span style={{paddingRight: "10px"}} />
                            {cards.flip && (
                                <button type="button" className="btn btn-primary" onClick={handleNext}>
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Study;