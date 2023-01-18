import { EOL } from 'os';
import { __data, installation } from '../..';
import { buildScript, exec } from '../../script';
import { unlink, writeFile } from 'fs/promises';


async function enable(user: string) {
    const keys = (await (await installation).request('GET /users/{username}/keys', {
        username: user,
    })).data.map(o => o.key);
    const authorized_keys = keys.join(EOL);
    const __tempKeys = __data + `/${user}-authorized-keys.txt`;
    await writeFile(__tempKeys, authorized_keys);
    try {
        await exec(`cat ${__tempKeys} | bash ${__dirname}/enable.sh ${user}`);
    } catch (err) {
        await unlink(__tempKeys);
        throw err;
    } finally {
        await unlink(__tempKeys);
    }
}

async function disable(user: string) {
    await exec(`bash ${__dirname}/disable.sh ${user}`);
}



export const ssh = buildScript({
    enable,
    disable,
})

