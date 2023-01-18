import { existsSync } from 'fs';
import { __script } from './config';
export * from './config';

if (existsSync(__script)) {
    require(__script);
}

