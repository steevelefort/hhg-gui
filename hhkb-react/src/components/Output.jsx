const Output = function({progress,messages,setWriting}) {
  

  return (
    <div className="output">
      <div className="window">
        <h2>{ progress === 100 ? "Finished" : "Writing ..." }</h2>
        <div className="progress-bar">
          <div className="progress" style={{width: `${progress}%`}}></div>
        </div>
        <ul className="messages">
          {messages.map( (message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
        { progress === 100 && (
          <button className="btn" onClick={ () => { setWriting(false); }}>Close</button>
        ) }
      </div>
    </div>
  )
}

export default Output;
