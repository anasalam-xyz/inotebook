
export default function About() {
    return (
        <div className="accordion my-3" id="accordionPanelsStayOpenExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panel1" aria-expanded="true" aria-controls="panel1">
                        About iNotebook
                    </button>
                </h2>
                <div id="panel1" className="accordion-collapse collapse show">
                    <div className="accordion-body">
                        <strong>iNotebook is a secure, cloud-based notes application.</strong>  
                        It stores all your notes safely in <strong>MongoDB Atlas</strong>, ensuring high availability and reliability.  
                        Each user has their own private space — your notes are <strong>only visible to you</strong>, thanks to the authentication system that uses <strong>JWT auth tokens</strong> to verify your identity.  
                        You can access and manage your notes anytime, anywhere with complete peace of mind.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel2" aria-expanded="false" aria-controls="panel2">
                        How to Use iNotebook
                    </button>
                </h2>
                <div id="panel2" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <strong>Getting started is simple!</strong>  
                        First, sign up using your email, then log in to access your dashboard.  
                        You can create, edit, and delete notes with ease.  
                        iNotebook is perfect for:  
                        <ul>
                            <li>Saving quick reminders</li>
                            <li>Storing study notes</li>
                            <li>Writing ideas or todos</li>
                            <li>Keeping personal records organized</li>
                        </ul>
                        The clean interface makes managing your notes fast and efficient — all synced securely to the cloud.
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panel3" aria-expanded="false" aria-controls="panel3">
                        Tech Stack & Development
                    </button>
                </h2>
                <div id="panel3" className="accordion-collapse collapse">
                    <div className="accordion-body">
                        <strong>iNotebook is built using the MERN stack:</strong>
                        <ul>
                            <li><strong>MongoDB Atlas</strong> – cloud database for storing notes</li>
                            <li><strong>Express.js</strong> – backend API for handling requests</li>
                            <li><strong>React.js</strong> – frontend UI and components</li>
                            <li><strong>Node.js</strong> – server runtime environment</li>
                        </ul>
                        Authentication uses <strong>JWT tokens</strong> for secure user verification.  
                        The project was developed with guidance from <strong>CodeWithHarry's React playlist</strong>, adapting concepts and expanding them into a full MERN application.
                    </div>
                </div>
            </div>

        </div>
    );
}
