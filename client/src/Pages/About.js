import React from "react"
import "../css/about.css"
import Nav from "../components/Nav"

const About=()=>{
    return (
        <>
        <Nav/>
        <section className="about-main-div">
            <div className="about-div">
            <h1>About us</h1>
            <p>Car Adoption Website is Ireland and Northern Ireland’s largest animal adoption portal, bringing together dogs, cats, and other animals available to adopt from rescues across Ireland.
                This means the public can view and apply to available animals in one place, rather than having to check each rescue individually.</p>
            </div>
            <div className="faq-div">
                <h2>FAQs</h2>
                <article className="faq-single-div">
                <h4>How often is it updated?</h4>
                <p>It pulls directly from the rescue's own admin so it's updated in real time as the rescues make their changes.</p>
                </article>
                <article className="faq-single-div">
                <h4>Does it cost anything?</h4>
                <p>No, it's free to use for the public and free for the rescues to join.</p>
                </article>
                <article className="faq-single-div">
                <h4>How do I know the status of my application?</h4>
                <p>You will be contacted when a successful applicant is chosen. The animal's profile will update to tell you whether it is processing (i.e. the rescues are working through the applications) or if it has been reserved or adopted.</p>
                </article>
                <article className="faq-single-div">
                <h4>How do I donate?</h4>
                <p>Each rescue has an individual donate button on their profiles that you can use to support them.</p>
                </article>
                <article className="faq-single-div">
                <h4>Can I add my animal rescue?</h4>
                <p>Of course, go to www.Car rescue.com to create your free PAW rescue manager account.</p>
                </article>
            </div>
            <div className="mission-div">
                <h2>Our Mission</h2>
                <p>To put an end to puppy farming in Ireland by making adopt don't shop so simple that it is the default for anyone looking for a Car .</p>
            </div>
            <div className="mission-div">
                <h2>The Team</h2>
                <p>The team behind PAW are seasoned fosterers who saw first hand the burden the rescues were under. We created PAW to help the rescues, but also to help the public find the right animal in order to reduce the demand for puppy farms and breeders.</p>
            </div>
            <div className="mission-div">
                <h2>About the Car Rescuep</h2>
                <p>Car Adoption Website is the public-facing side of the PAW group. We also provide a full solution for animal rescues to manage their animals and streamline their admin. For more information on Paw Rescue Manager visit: www.pawrescuemanager.com</p>
            </div>
        </section>
        </>
    )
}

export default About
