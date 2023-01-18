import { EOL } from 'os';
import { __data, installation } from '../..';
import { buildScript, exec } from '../../script';
import { unlink, writeFile } from 'fs/promises';


async function enable(user: string) {
    user = user.toLowerCase();
    const keys = (await (await installation).request('GET /users/{username}/keys', {
        username: user,
    })).data.map(o => o.key);
    const authorized_keys = keys.join(EOL);
    const __tempKeys = __data + `/${user}-authorized-keys.txt`;
    await writeFile(__tempKeys, authorized_keys);
    try {
        // await exec(`cat ${__tempKeys} | bash ${__dirname}/enable.sh ${user}`);
        // await exec(`whoami`);
        // await exec(`ls ${__data}`);
        // await exec(`cat ${__tempKeys}`);
        // await exec(`cat ${__dirname}/enable.sh`);
        await exec(`cat ${__tempKeys} | bash ${__dirname}/enable.sh ${user}`);
    } catch (err) {
        try {
            await unlink(__tempKeys);
        } catch(err2) {};
        throw err;
    } finally {
        try {
            await unlink(__tempKeys);
        } catch(err2) {};
    }
}

async function disable(user: string) {
    user = user.toLowerCase();
    await exec(`bash ${__dirname}/disable.sh ${user}`);
}



export const ssh = buildScript({
    enable,
    disable,
})

