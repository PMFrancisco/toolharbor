/**
 * JWT Generator utilities
 *
 * Signs JWTs client-side using the Web Crypto API.
 * Supports HMAC algorithms only (HS256, HS384, HS512).
 */

export type JwtAlgorithm = 'HS256' | 'HS384' | 'HS512';

export interface JwtGenerateSuccess {
  success: true;
  data: string; // The signed JWT token
}

export interface JwtGenerateError {
  success: false;
  error: string;
}

export type JwtGenerateResult = JwtGenerateSuccess | JwtGenerateError;

/** Map JWT algorithm names to Web Crypto hash names */
const algorithmMap: Record<JwtAlgorithm, string> = {
  HS256: 'SHA-256',
  HS384: 'SHA-384',
  HS512: 'SHA-512',
};

/** Base64URL encode a string (replace + with -, / with _, remove trailing =) */
function base64UrlEncode(str: string): string {
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Base64URL encode a Uint8Array */
function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return base64UrlEncode(binary);
}

/**
 * Generate and sign a JWT token using the Web Crypto API
 */
export async function generateJwt(
  payload: string,
  secret: string,
  algorithm: JwtAlgorithm
): Promise<JwtGenerateResult> {
  try {
    if (!payload.trim()) {
      return { success: false, error: 'Payload cannot be empty' };
    }

    if (!secret) {
      return { success: false, error: 'Secret key cannot be empty' };
    }

    // Validate payload is valid JSON
    let parsedPayload: unknown;
    try {
      parsedPayload = JSON.parse(payload);
    } catch {
      return { success: false, error: 'Payload must be valid JSON' };
    }

    if (
      typeof parsedPayload !== 'object' ||
      parsedPayload === null ||
      Array.isArray(parsedPayload)
    ) {
      return { success: false, error: 'Payload must be a JSON object' };
    }

    // Build header
    const header = JSON.stringify({ alg: algorithm, typ: 'JWT' });
    const encodedHeader = base64UrlEncode(header);

    // Encode payload (use the stringified parsed version for clean formatting)
    const encodedPayload = base64UrlEncode(JSON.stringify(parsedPayload));

    // Create signing input
    const signingInput = `${encodedHeader}.${encodedPayload}`;

    // Import the secret key
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: algorithmMap[algorithm] },
      false,
      ['sign']
    );

    // Sign
    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      encoder.encode(signingInput)
    );

    // Base64URL encode the signature
    const encodedSignature = base64UrlEncodeBytes(new Uint8Array(signatureBuffer));

    return {
      success: true,
      data: `${signingInput}.${encodedSignature}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate JWT',
    };
  }
}

/**
 * Returns a sample JWT payload JSON string
 */
export function getDefaultPayload(): string {
  const now = Math.floor(Date.now() / 1000);
  return JSON.stringify(
    {
      sub: '1234567890',
      name: 'John Doe',
      iat: now,
      exp: now + 3600,
    },
    null,
    2
  );
}

/** Available JWT algorithms with metadata */
export const jwtAlgorithms: { value: JwtAlgorithm; label: string }[] = [
  { value: 'HS256', label: 'HS256 (SHA-256)' },
  { value: 'HS384', label: 'HS384 (SHA-384)' },
  { value: 'HS512', label: 'HS512 (SHA-512)' },
];
