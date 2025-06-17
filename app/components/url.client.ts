
const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
const host = window.location.host; 
export const wsUrl = `${protocol}://${host}/ws`; // ou un sous-domaine : `${protocol}://ws.${host}`
export const supportsVibrationAPI =
  "vibrate" in window.navigator;