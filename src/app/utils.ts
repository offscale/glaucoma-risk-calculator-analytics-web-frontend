export const getRedirectUrl = (url: string): string | null => new URLSearchParams(url.slice(1)).get('redirectUrl');

export const lowerCamel2under = (s: string): string => s.replace(/_([a-z])/g, (x, up) => up.toUpperCase());
