import './App.css'

function App() {
  // localhost:8787にgetリクエストを送り、レスポンスを表示
  const getApi = async () => {
    const res = await fetch('http://localhost:8787/')
    const data = await res.json()
    console.log(data)
  }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>React App</h1>
          <button onClick={getApi}>Get API</button>
        </header>
      </div>
    </>
  )
}

export default App
