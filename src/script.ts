import { exec as _exec } from 'child_process'
import { promisify } from 'util'


export const exec = promisify(_exec);

export function buildScript<T extends { [key: string]: (...args: any[]) => any }>(scripts: T) {
    return function <K extends keyof T>(script: K, ...args: Parameters<T[K]>): ReturnType<T[K]> {
        return scripts[script](...args)
    }
}



