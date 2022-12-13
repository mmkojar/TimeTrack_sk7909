import { START_LOADER, STOP_LOADER  } from './type';

export const start_loader = () => {
    return {
        type: START_LOADER,
    }
}

export const stop_loader = () => {
    return {
        type: STOP_LOADER,
    }
}