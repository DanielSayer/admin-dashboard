export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function mimicServerCall() {
  return delay(getRandomInt(300, 3000));
}
