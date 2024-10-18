import Convertor from "./components/Convertor"

function App() {

  return (
    <>
      <header style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
        <h1 className="main-title">ReBac - Easy Tool For Removing Background</h1>
      </header>
      <main style={{justifyContent: "center", alignItems: "center", display: "flex", marginTop: "30px"}}>
        <div>
          <Convertor></Convertor>
        </div>
      </main>
      <footer style={{justifyContent: "center", alignItems: "center", display: "flex", margin: "10px"}}>
        <div>
          <span>Author: <a href="https://github.com/Enigma036">Tomas Hanak</a></span>
        </div>
      </footer>
    </>
  )
}

export default App
