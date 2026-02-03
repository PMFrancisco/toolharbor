export interface JwtHeader {
  alg: string;
  typ?: string;
  [key: string]: unknown;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
  [key: string]: unknown;
}

export interface JwtDecoded {
  header: JwtHeader;
  payload: JwtPayload;
  signature: string;
  isExpired: boolean;
  expiresAt?: Date;
  issuedAt?: Date;
}

export interface JwtDecodeSuccess {
  success: true;
  data: JwtDecoded;
}

export interface JwtDecodeError {
  success: false;
  error: string;
}

export type JwtResult = JwtDecodeSuccess | JwtDecodeError;

/**
 * Decode a base64url encoded string
 */
function base64UrlDecode(str: string): string {
  // Replace URL-safe characters
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');

  // Pad with '=' if needed
  const pad = base64.length % 4;
  if (pad) {
    base64 += '='.repeat(4 - pad);
  }

  try {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    return atob(base64);
  }
}

/**
 * Decode a JWT token without verification
 */
export function decodeJwt(token: string): JwtResult {
  if (!token.trim()) {
    return { success: false, error: 'Please enter a JWT token' };
  }

  const parts = token.trim().split('.');

  if (parts.length !== 3) {
    return {
      success: false,
      error: 'Invalid JWT format. A JWT must have 3 parts separated by dots.',
    };
  }

  try {
    const headerJson = base64UrlDecode(parts[0]);
    const payloadJson = base64UrlDecode(parts[1]);

    let header: JwtHeader;
    let payload: JwtPayload;

    try {
      header = JSON.parse(headerJson);
    } catch {
      return { success: false, error: 'Invalid JWT header - not valid JSON' };
    }

    try {
      payload = JSON.parse(payloadJson);
    } catch {
      return { success: false, error: 'Invalid JWT payload - not valid JSON' };
    }

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp ? payload.exp < now : false;
    const expiresAt = payload.exp ? new Date(payload.exp * 1000) : undefined;
    const issuedAt = payload.iat ? new Date(payload.iat * 1000) : undefined;

    return {
      success: true,
      data: {
        header,
        payload,
        signature: parts[2],
        isExpired,
        expiresAt,
        issuedAt,
      },
    };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Failed to decode JWT',
    };
  }
}

/**
 * Check if a string looks like a JWT
 */
export function isJwtFormat(str: string): boolean {
  const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]*$/;
  return jwtPattern.test(str.trim());
}
