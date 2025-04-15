// This file is used by Next.js to generate an icon for your application
// Default size for this icon is 32x32 pixels
export const size = {
  width: 32,
  height: 32,
}

// Set the content type for this icon
export const contentType = 'image/png'

// Simple icon export - a colored square with an initial 'S'
export default function Icon() {
  // Convert base64 to Uint8Array (binary data)
  const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE5SURBVFhH7ZY9TgMxEIXf2psCdBy4AidAdJQUcIcU3ACJipaS+yAhISERoqKzxdqMtZr1jH/W2QaqfNLIk/H4vbGdZAoiIrrUHfaBT42LtgAHQLkSLRcrhyKWGRfYeRbpPLn5lRrEiuElXRgIxSj5CbuHp6DVF6gjK0arTVs56uo1fLFYKFZhJ2g3oNUBs2K0XqzdrKeX9Pl4/o4HuCYKoWuDsD8eLGVIGhKXA21pSFrSEBvxAOpJS1rSdQrLQSp9qQlad9pv6On1VZEylJY0JHhfaYQNSUsaEpfb/Wum7rTfUPP1rQ9Igk22lEO/eFA0LEnszx31TdA/QqsmZ4g0hBYcR+8/nL7nXhdUhuTyPvfaqLqWjXQp2q0YXtLmmKX/nVBJkrjT5mBJ7KAT2Hg6c45/Uh+gP0NV/SKKooGZjrPnAAAAAElFTkSuQmCC';
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  // Return a proper Response object
  return new Response(bytes, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 