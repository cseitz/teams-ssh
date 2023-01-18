import { ssh, sudo } from './src/scripts';
import { getMembersDelta } from './src/teams';



async function updateSSH() {
    const { added, removed, members, commit } = await getMembersDelta('ssh');
    await removed.map(o => ssh('disable', o.login));
    await added.map(o => ssh('enable', o.login));
    await commit();
}

async function updateSudo() {
    const { added, removed, members, commit } = await getMembersDelta('sudo');
    await removed.map(o => sudo('disable', o.login));
    await added.map(o => sudo('enable', o.login));
    await commit();
}


async function update() {
    await updateSSH();
    await updateSudo();
}


update();
setInterval(() => {
    update();
}, 60 * 1000)