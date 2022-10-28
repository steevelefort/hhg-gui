const hhg = {
    getKeymap: async (fn = false) => {
        return await window.Neutralino.os.execCommand(`hhg -k${fn === true ? " --fn" : ""}`);
    },

    getInfo: async () => {
        const info = [];
        const rawInfo = (await window.Neutralino.os.execCommand(`hhg -i`)).stdOut;
        const lines = rawInfo.split('\n');
        for (const line of lines) {
            if (line.length > 0) {
                const parts = line.split(':');
                info.push({ key: parts[0].trim(), value: parts[1].trim() });
            }
        }
        return info;
    },

    setKey: async (code, scancode, fn = false) => {
        try {
            const command = `echo "confirm" | hhg ${fn ? "--fn" : ""} -r ${code} -s ${scancode}`;
            console.log("Execute: ", command);
            const response = (await window.Neutralino.os.execCommand(command)) //.stdOut;
            if (response.exitCode === 0) return true;
            console.error(response.stdOut);
            return false;
        } catch (e) {
            console.error(e.message);
            return false;
        }
    }
}

export default hhg;
