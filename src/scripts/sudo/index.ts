import { EOL } from 'os';
import { __data, installation } from '../..';
import { buildScript, exec } from '../../script';
import { unlink, writeFile } from 'fs/promises';


async function enable(user: string) {
    await exec(`bash ${__dirname}/enable.sh ${user}`);
}

async function disable(user: string) {
    await exec(`bash ${__dirname}/disable.sh ${user}`);
}



export const sudo = buildScript({
    enable,
    disable,
})

