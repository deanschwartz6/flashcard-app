import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbNav({string, deck, url, cardId}) {
    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">
                    <span className="oi oi-home" /> Home
                </Link>
            </li>
            {string === "Study" ? (
                <>
                    <li className="breadcrumb-item">
                        <Link to={url}>
                            {`${deck.name}`}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">{string}</li>
                </>
            ) : string === "Deck" ? (
                <>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </>
            ) : string === "Edit Card" ? (
                <>
                    <li className="breadcrumb-item">
                        <Link to={url}>
                            {`${deck.name}`}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">{`${string} ${cardId}`}</li>
                </>
            ) : string === "Add Card" ? (
                <>
                    <li className="breadcrumb-item">
                        <Link to={url}>
                            {`${deck.name}`}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">{string}</li>
                </>
            ) : string === "Edit Deck" ? (
                <>
                    <li className="breadcrumb-item">
                        <Link to={url}>
                            {`${deck.name}`}
                        </Link>
                    </li>
                    <li className="breadcrumb-item active">{string}</li>
                </>
            ) : string === "Create Deck" ? (
                <>
                    <li className="breadcrumb-item active">{string}</li>
                </>
            ) : null}
            </ol>
        </nav>
        </>
    );
}

export default BreadCrumbNav;