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

export const getSearchParams = () => {
  const paramsString = window.location.search.replace('?', '') ?? '';
  const searchParams = new URLSearchParams(paramsString);

  return searchParams;
};

export const sendDataToGA = async (score: string, button: string) => {
  try {
    const variant = getSearchParams().get('utm_campaign') ?? '';
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      'https://script.google.com/macros/s/AKfycbz50VLeXWXZYHQMjE0CHLBxWHD1ngJrvQB8wyPdnYvchnmw-Bs9agylPxODtTeib8Oz/exec',
      {
        redirect: 'follow',
        method: 'POST',
        body: JSON.stringify({ date, score, button, variant }),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      },
    );
  } catch (error) {
    console.error('Error!', error);
  }
};
