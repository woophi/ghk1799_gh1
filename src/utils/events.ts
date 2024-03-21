declare global {
  interface Window {
    ym: (id: number, event: string, target: string) => void;
  }
}
export const sendDataToYM = (target: string) => {
  if (!window.ym) {
    console.warn('no ym');
    return;
  }

  window.ym(96171108, 'reachGoal', target);
};
