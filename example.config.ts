import { ssh, sudo } from './src/scripts';
import { getMembersDelta } from './src/teams';

getMembersDelta('ssh').then(o => console.log(o))


async function updateSSH() {
    const { added, removed, members, commit } = await getMembersDelta('ssh');
    await removed.map(o => ssh('disable', o.name!));
    await added.map(o => ssh('enable', o.name!));
    await commit();
}

async function updateSudo() {
    const { added, removed, members, commit } = await getMembersDelta('sudo');
    await removed.map(o => sudo('disable', o.name!));
    await added.map(o => sudo('enable', o.name!));
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