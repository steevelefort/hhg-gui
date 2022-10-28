function Keyboard({ keymaps, layer, scancodes, setKeymaps }) {

  //console.log(scancodes);
  const getScancode = (code) => {
    return scancodes.find(scancode => code == scancode.code);
  }

  const onDragOver = function(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("drag-over");
    const data = JSON.parse(e.dataTransfer.getData("text"));

    const newKeymaps = [...keymaps];
    const targetKey = newKeymaps[layer].find((item) => item.code == e.currentTarget.getAttribute("data-keycode"));

    switch (data.type) {
      case "key":
        const sourceKey = newKeymaps[layer].find((item) => item.code == data.value);
        const tmp = targetKey.scancode;
        targetKey.scancode = sourceKey.scancode;
        sourceKey.scancode = tmp;
        break;
      case "scancode":
        targetKey.scancode = data.value;
        break;
    }
    setKeymaps(newKeymaps);

  }

  return (
    <div className="hhkb">
      <div className="battery"></div>
      <div className="keyboard">
        {keymaps[layer].map((key) => {
          const scancode = getScancode(key.scancode);
          return (
            <div className={key.type} key={key.code} style={{ width: `calc(100% / 15 * ${key.size})` }}>
              {key.type === "key" && (
                <div className={`keytop${key.code === 3 ? " spaceKey" : ""}${key.scancode !== key.previousScancode ? " uncommited" : ""}`}
                  data-keycode={key.code}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text", JSON.stringify({
                      type: "key",
                      value: key.code
                    }))
                  }}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add("drag-over"); }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove("drag-over"); }}
                  onDrop={onDragOver}
                >
                  {scancode.shifted !== undefined && (
                    <div className="shifted">{scancode.shifted}</div>
                  )}
                  <div className="print">{scancode.normal}</div>
                  <div className="code">{scancode.code}</div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Keyboard;
