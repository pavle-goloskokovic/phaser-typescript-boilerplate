import * as logger from 'js-logger'

export const title = "Phaser TypeScript Boilerplate";
export const mute = false;
export const stats = true;
export const logLevel = logger.DEBUG;
export const size: {
    readonly x:number
    readonly y:number
} = {
    x: 1070,
    y: 600
};
export const orientation: {
    readonly forceLandscape:boolean
    readonly forcePortrait:boolean
} = {
    forceLandscape: false,
    forcePortrait: false
};
export const analyticsId = 'UA-000000-2';
