import Convertor from "./components/Convertor"

function App() {

  return (
    <>
      <header style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
        <h1>ReBac - Easy Tool For Removing Background</h1>
      </header>
      <main style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
        <div>
          <Convertor></Convertor>
        </div>
      </main>
    </>
  )
}

export default App
