import { ChildProcess, exec as _exec, spawn } from 'child_process'
import { promisify } from 'util'


export function buildScript<T extends { [key: string]: (...args: any[]) => any }>(scripts: T) {
    return function <K extends keyof T>(script: K, ...args: Parameters<T[K]>): ReturnType<T[K]> {
        return scripts[script](...args)
    }
}


const execp = promisify(_exec);

export function exec(cmd: string) {
    console.log('exec', { cmd });
    const proc = spawn(cmd, {
        stdio: 'inherit'
    })
    return new Promise<ChildProcess>((resolve, reject) => {
        proc.on('error', err => reject(err));
        proc.on('close', () => {
            resolve(proc);
        })
    })
}
