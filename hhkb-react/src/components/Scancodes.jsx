import { useState } from "react";

const Scancodes = function({ scancodes }) {

  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();

  useState(() => {
    const list = [];
    for (const scancode of scancodes) {
      if (!list.includes(scancode.type)) { list.push(scancode.type) }
    }
    list.sort();
    setCategories(list);
    setActive(list[0]);
  }, [])

  return (
    <div className="scancodes-block">
      <div className="tabs">
        {categories.map(((category) => (
          <div className={"tab" + (active == category ? " active" : "")}
            onClick={() => { setActive(category) }}
          >{category}</div>
        )))}
      </div>
      <div className="scancodes">
        {scancodes.map(scancode => (
          scancode.type === active && (
            <div className="scancode" draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text", JSON.stringify({
                  type: "scancode",
                  value: scancode.code
                }))
              }}
            >
              {scancode.normal}
              {scancode.shifted !== undefined && (" " + scancode.shifted)}
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Scancodes;
