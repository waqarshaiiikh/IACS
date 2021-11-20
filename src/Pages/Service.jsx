import React from 'react'
import softwarehouse from "../Images/softwarehouse.svg"
import student from "../Images/student.svg"
import job from "../Images/job.svg"

const Service = () => {
    return (
        <>
            <section id="services">
                <div class="software-house">
                    <img src={softwarehouse} alt=""/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolorem, labore voluptate eligendi minus
                    mollitia fugit quasi ex doloribus nam molestias sed similique, quas rerum, doloremque vel libero quaerat
                    assumenda nulla!</p>
                </div>
                <div class="student-image">
                    <img src={student} alt=""/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolorem, labore voluptate eligendi minus
                    mollitia fugit quasi ex doloribus nam molestias sed similique, quas rerum, doloremque vel libero quaerat
                    assumenda nulla!</p>
                </div>
                <div class="job-image">
                    <img src={job} alt=""/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Dolorem, labore voluptate eligendi minus
                    mollitia fugit quasi ex doloribus nam molestias sed similique, quas rerum, doloremque vel libero quaerat
                    assumenda nulla!</p>
                </div>
            </section>
        </>
    )
}

export default Service
