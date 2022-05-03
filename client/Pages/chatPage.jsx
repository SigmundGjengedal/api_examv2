import React, {useState} from "react";
import "../styling/chatPage.css"

function Login({onLoginCallback}) {
    const [username, setUsername] = useState("");

    function handleSubmit(event) {
        event.preventDefault()
        onLoginCallback(username) // sender username tilbake til ChatPage.
    }

    // form der man angir brukernavn. Det lagres i state.
    return <div>
        <h1>please login to chat</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <button>Login</button>
        </form>
    </div>
}

function ChatApp({username}) {
    function handleMessage(event){
        event.preventDefault()
    }
    return (
        <div className={"chat-page"}>
            <header> Chat with {username}</header>
            <main> Here is the main content</main>
            <footer>
                <form onSubmit={handleMessage}>
                    <input />
                    <button>Send</button>
                </form>
            </footer>
        </div>
    )
}

export function ChatPage() {
    const [username, setUsername] = useState("Sigmund");

    // går hit å henter username.
    if (!username) {
        return <Login onLoginCallback={(username) => setUsername(username)}/>
    }
    return <ChatApp username={username}/>
}