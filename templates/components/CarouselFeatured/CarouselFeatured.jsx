import React, {useEffect, useState} from 'react';
import axios from "axios";
import Link from "next/link";

function CarouselFeatured(props) {

    const [loading,setLoading]= useState(true);
    const [featured,setFeatured] = useState(props.featured);

    return (
        <>
        {
            featured &&
            (
                <div className="col-12 mt-5 mb-3">
                    <div className="mb-4 d-md-flex justify-content-between align-items-center">
                        <h2 className="m-0">Blogs populaires</h2>

                    </div>
                    <div id="carouselExampleCaptions"  className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {
                                featured.map((post,index)=>(
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index}
                                            className="active" aria-current="true" aria-label={"Slide "+index}/>
                                ))
                            }
                        </div>
                        <div className="carousel-inner">

                            {
                                featured.map((post,index) =>
                                    (
                                            <div className={index === 0 ? "carousel-item active":"carousel-item"} >
                                                <div>
                                                    <div style={{
                                                        height:"200px",
                                                        backgroundImage:`linear-gradient(0deg, rgba(0, 0, 0, 0.60),rgba(0, 0, 0, 0.60)),url('/images/blogs/resized/${post.image}')`,
                                                        backgroundSize:"cover",
                                                        backgroundRepeat:'no-repeat'
                                                    }}>
                                                    </div>

                                                    <div className="carousel-caption" style={{
                                                        textShadow:"black 0.1em 0.1em 0.2em",
                                                        cursor:"pointer",
                                                    }}>
                                                        <Link href={"/post/"+post._id}>
                                                            <div>
                                                                <h5>{post.title}</h5>
                                                                <p className={"d-none d-md-block"}>{post.short_description}</p>
                                                            </div>
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>
                                    )
                                )
                            }

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            )

        }
        </>

    );
}

export default CarouselFeatured;