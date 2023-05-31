const minDelay = 300;
const maxDelay = 500;

export const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
