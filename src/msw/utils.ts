const minDelay = 1000;
const maxDelay = 2000;

export const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
