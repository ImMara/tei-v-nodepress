import React from 'react';
import {truncateString} from "../../../utils/functions";
import Link from "next/link";

function FullCard(props) {
    return (
        <>
        <div
            className= {
                props.first?'card relative firstCard':
                props.second?'card relative secondCard':"card relative"
            }
            style={{
                backgroundImage:'url('+props.image+')',
                backgroundPosition:'center left',
                backgroundSize:"cover",
                height:props.height,
                border:' 0 solid rgba(0, 0, 0, 0.1)',
            }}
            >
            <div className="card-body d-flex align-items-center p-3"
                 style={{background:'linear-gradient(0deg, black, transparent)',}}
            >
                <div className="w-100 mt-auto text-white">

                    <h4 className="card-title">
                        <Link href={"/post/"+props.post._id}>
                        <a
                            className="btn-link stretched-link text-reset"
                            style={{
                                textShadow:"black 0.1em 0.1em 0.2em"
                            }}
                            >{truncateString(props.post.title,45)}</a>
                        </Link>
                    </h4>
                    {
                        !props.short && (
                            // lorem 25
                            <p className={"d-none d-lg-block"}
                                style={{
                                textShadow:"black 0.1em 0.1em 0.2em"
                            }}>{props.post.short_description}</p>
                        )
                    }
                    <div className={"d-flex align-items-center"}  style={{
                        textShadow:"black 0.1em 0.1em 0.2em"
                    }}>
                        {
                            props.first && (
                                <h5 className="me-3 d-none d-lg-block">{props.post.author !== null ? props.post.author.username : "anonymous"}</h5>
                            )
                        }
                        {
                            !props.short && (
                                <span className="small d-none d-lg-block">{props.post.date.substring(0, 10)}</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default FullCard;