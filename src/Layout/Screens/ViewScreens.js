import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Study from "./Study";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

function ViewScreens() {
    const [refresh, setRefresh] = useState(false);
    return (
        <>
            <Switch>
                <Route exact={true} path="/decks/:deckId/study">
                    <Study />
                </Route>
                <Route exact={true} path="/decks/:deckId">
                    <Deck refresh={refresh} setRefresh={setRefresh} />
                </Route>
                <Route exact={true} path="/decks/:deckId/edit">
                    <EditDeck />
                </Route>
                <Route exact={true} path="/decks/:deckId/cards/new">
                    <AddCard />
                </Route>
                <Route exact={true} path="/decks/:deckId/cards/:cardId/edit">
                    <EditCard refresh={refresh} setRefresh={setRefresh} />
                </Route>
            </Switch>
        </>
    );
}

export default ViewScreens;