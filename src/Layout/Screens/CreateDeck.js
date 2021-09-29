import React from "react";
import BreadCrumbNav from "./BreadCrumbNav";
import Form from "./Form";

function CreateDeck() {
    return (
        <>
            <BreadCrumbNav string="Create Deck" />
            <h1>Create Deck</h1>
            <Form />
        </>
    );
}

export default CreateDeck;