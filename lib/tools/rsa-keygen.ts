export interface RsaKeyPair {
  publicKey: string;
  privateKey: string;
  bits: number;
}

export type RsaKeySize = 2048 | 4096;

export type RsaKeyResult = { success: true; data: RsaKeyPair } | { success: false; error: string };

/**
 * Convert an ArrayBuffer to base64 string
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Format base64 string into PEM-style lines (64 chars per line)
 */
function formatPem(base64: string, type: 'PUBLIC KEY' | 'PRIVATE KEY'): string {
  const lines: string[] = [];
  for (let i = 0; i < base64.length; i += 64) {
    lines.push(base64.slice(i, i + 64));
  }
  return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`;
}

/**
 * Generate an RSA key pair using Web Crypto API and export as PEM
 */
export async function generateRsaKeyPair(bits: RsaKeySize = 2048): Promise<RsaKeyResult> {
  try {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: bits,
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: 'SHA-256',
      },
      true, // extractable
      ['encrypt', 'decrypt']
    );

    const publicKeyBuffer = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    const privateKeyBuffer = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

    const publicPem = formatPem(arrayBufferToBase64(publicKeyBuffer), 'PUBLIC KEY');
    const privatePem = formatPem(arrayBufferToBase64(privateKeyBuffer), 'PRIVATE KEY');

    return {
      success: true,
      data: {
        publicKey: publicPem,
        privateKey: privatePem,
        bits,
      },
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to generate RSA key pair',
    };
  }
}

export const keySizeOptions = [
  { value: 2048, label: '2048 bits' },
  { value: 4096, label: '4096 bits' },
];
