export const getRedirectUrl = (url: string): string | null => new URLSearchParams(url.slice(1)).get('redirectUrl');
