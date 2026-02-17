export type HmacAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

export interface HmacEntry {
  algorithm: HmacAlgorithm;
  hash: string;
}

export type HmacResult = { success: true; data: HmacEntry[] } | { success: false; error: string };

export const hmacAlgorithms: { value: HmacAlgorithm; label: string; bits: number }[] = [
  { value: 'SHA-256', label: 'HMAC-SHA256', bits: 256 },
  { value: 'SHA-384', label: 'HMAC-SHA384', bits: 384 },
  { value: 'SHA-512', label: 'HMAC-SHA512', bits: 512 },
];

/**
 * Generate HMAC for a message with a secret key using Web Crypto API
 */
async function computeHmac(
  message: string,
  secret: string,
  algorithm: HmacAlgorithm
): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const msgData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: { name: algorithm } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate HMAC hashes for all supported algorithms
 */
export async function generateAllHmacs(message: string, secret: string): Promise<HmacEntry[]> {
  const results: HmacEntry[] = [];

  for (const { value: algorithm } of hmacAlgorithms) {
    const hash = await computeHmac(message, secret, algorithm);
    results.push({ algorithm, hash });
  }

  return results;
}

/**
 * Generate HMAC for a single algorithm
 */
export async function generateHmac(
  message: string,
  secret: string,
  algorithm: HmacAlgorithm
): Promise<string> {
  return computeHmac(message, secret, algorithm);
}
