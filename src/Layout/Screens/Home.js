import React from "react";
import { Link } from "react-router-dom";
import DecksHomeView from "../Screens/DecksHomeView";

function Home() {

    return (
        <section>
            <div>
                <Link type="button" className="btn btn-secondary m-2" to="/decks/new">
                    <span className="oi oi-plus m-1" />
                    Create Deck
                </Link>
            </div>
            <div>
                <DecksHomeView />
            </div>
        </section>
    );
}

export default Home;