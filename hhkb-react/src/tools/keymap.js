import hhg from './hhg';

function getKeySize(keycode) {
    switch (keycode) {
        case 45:
            return 1.5;
        case 32:
            return 1.5;
        case 31:
            return 1.75;
        case 19:
            return 2.25;
        case 18:
            return 2.25;
        case 7:
            return 1.75;
        case 4:
            return 1.5;
        case 3:
            return 6;
        case 2:
            return 1.5;
        default:
            return 1;
    }
}

async function getMap(fn = false) {

    const map = [];

    // Get "hhg -k" command line output
    //const result = await window.Neutralino.os.execCommand(`hhg -k${fn===true?" --fn":""}`);
    const result = await hhg.getKeymap(fn);

    //console.log(result);
    // Remove spaces and dashes    
    let raw = result.stdOut.replace(/ |-/gm, '');
    // Remove starting and ending pipes, and remove empty lines
    raw = raw.replace(/^\s|^\||\|$/gm, '');

    // Parse lines by pair (one line of keys, one line of scancodes)
    const lines = raw.split('\n')
    for (let index = 0; index < 5; index++) {
        const keys = lines[index * 2].split("|");
        const scancodes = lines[index * 2 + 1].split("|");

        for (const item in keys) {
            const code = parseInt(keys[item]);
            if (code === 5) { map.push({ type: "spacer", size: 1.5 }) }
            map.push({
                type: "key",
                code: code,
                scancode: parseInt(scancodes[item], 16),
                previousScancode: parseInt(scancodes[item], 16),
                size: getKeySize(code),
                //commit: true
            })
        }
    }
    map.push({ type: "spacer", size: 2.25 })

    return map;
}

const getCurrentKeymap = async () => {
    //console.log('test');
    return [await getMap(), await getMap(true)];
}

export default getCurrentKeymap;

