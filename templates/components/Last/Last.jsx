import React from 'react';
import FullCard from "../FullCard/FullCard";

function Last(props) {
    return (
        <div className={"row g-4 pt-4 pb-4 mb-5"}>


            <div className="col-lg-6">
                <FullCard post={props.posts[0]} image={"https://picsum.photos/260/300"} height="100%"/>
            </div>

            <div className="col-lg-6">
                <div className="row g-4">

                    {
                        props.posts[1] && (
                            <div className="col-12">
                                <FullCard short={true} post={props.posts[1]} image={"https://picsum.photos/210/300"} height="320px"/>
                            </div>
                        )
                    }

                    {
                        props.posts[2] && (
                            <div className="col-6">
                                <FullCard short={true} post={props.posts[2]} image={"https://picsum.photos/200/310"} height="220px"/>
                            </div>
                        )
                    }

                    {
                        props.posts[3] && (
                            <div className="col-6">
                                <FullCard short={true} post={props.posts[3]} image={"https://picsum.photos/200/320"} height="220px"/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Last;