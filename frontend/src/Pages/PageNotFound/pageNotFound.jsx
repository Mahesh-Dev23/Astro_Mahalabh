import "./pageNotFound.css"

const pageNotFound = () => {
    return (
        <div style={{ textAlign: "center", backgroundColor: "#f0f0f0", height: "100vh"}}>
            <h2>This Page Does Not Exist</h2>
            <p>Sorry, the page you are looking for could not be found. It's just an accident that was not intentional.</p>
        </div>
    )
}

export default pageNotFound