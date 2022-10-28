const Switch = function({active,offValue=false,onValue=true,onChange,label}) {
  const toggle = () => { 
    console.log("toogle");
    onChange(active?offValue:onValue)
  }
  return (
    <div className="switch-group">
      <label>{label}</label>
      <div className={"switch" + (active ? " on":"")} onClick={toggle}>
        <div className={"toggle" + (active ? " on":"")}></div>
      </div>
    </div>
  )
}

export default Switch;
