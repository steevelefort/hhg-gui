import './App.css';
import { useEffect, useState } from 'react';
import getCurrentKeymap from './tools/keymap';
import Keyboard from './components/Keyboard';
import Info from './components/Info';
import Switch from './components/Switch';
import Scancodes from './components/Scancodes';
import Output from './components/Output';
import scancodes from './scancodes';
import hhg from './tools/hhg';

function App() {

  const [keymaps, setKeymaps] = useState([]);
  const [layer, setLayer] = useState(0);
  const [info, setInfo] = useState([]);
  const [writing, setWriting] = useState(false);
  const [progress, setProgress] = useState(50);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const currentKeymap = await getCurrentKeymap();
        setKeymaps(currentKeymap);
        const currentInfo = await hhg.getInfo();
        setInfo(currentInfo);
        //console.log(currentInfo);
      } catch (e) {
        //console.log(e.message);
        setInfo(null);
      }
    })()
  }, []);

  const hasChanges = function() {
    for (const keymap of keymaps) {
      for (const key of keymap) {
        if (key.scancode != key.previousScancode) return true;
      }
    }
    return false;
  }

  const saveKeymap = async () => {
    if (window.confirm("Are your sure to want to write changes ?")) {
      setProgress(0);
      setWriting(true);
      setMessages([]);
      let changes = 0;
      for (const keymap of keymaps) {
        for (const key of keymap) {
          if (key.scancode != key.previousScancode) changes++;
        }
      }
      let progress = 0;
      for (const layer in keymaps) {
        const keymap = keymaps[layer];
        for (const key of keymap) {
          if (key.scancode != key.previousScancode) {
            // Write changes here
            try {
              console.log(`Write scancode ${key.scancode} on key ${key.code}`);
              if (!await hhg.setKey(key.code, key.scancode, layer == 1 ? true : false)) {
                setMessages([...messages, `Can't write scancode ${key.scancode} on key ${key.code}`]);
              } else {
                key.previousScancode = key.scancode;
              }
            } catch (e) {
              setMessages([...messages, `Can't write scancode ${key.scancode} on key ${key.code}`]);
            }
            progress++;
            setProgress(progress/changes*100);
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <header>
        <h1>HHKB - Remap tool</h1>
        <button
          className={'btn' + (hasChanges() ? " uncommited" : "")}
          disabled={!hasChanges()}
          onClick={saveKeymap}
        >{!hasChanges() ? "NO CHANGE" : "WRITE CHANGES"}</button>
        <Switch
          label="FN layer"
          active={layer}
          offValue={0} onValue={1}
          onChange={setLayer}
        ></Switch>
      </header>
      {info !== null ? (
        <main>
          {info !== undefined && (
            <Info info={info}></Info>
          )}
          {keymaps.length && (
            <Keyboard keymaps={keymaps} layer={layer} scancodes={scancodes} setKeymaps={setKeymaps}></Keyboard>
          )}
          <Scancodes scancodes={scancodes}></Scancodes>
        </main>
      ) : (
        <div className="nohhkb">
          <h2>No HHKB detected.</h2>
          <p>Check if "hhg" software is installed, and insure your keyboard is plugged</p>
        </div>
      )}
      {writing && (
        <Output progress={progress} messages={messages} setWriting={setWriting}></Output>
      )}
    </div>
  );
}

export default App;
