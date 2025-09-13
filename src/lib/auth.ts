import { SignJWT, jwtVerify } from 'jose';

const secret = process.env.JWT_SECRET || '';

function getEncodedSecret(): Uint8Array {
  if (!secret || secret.length < 16) {
    throw new Error('JWT_SECRET is missing or too short');
  }
  return new TextEncoder().encode(secret);
}

export type AdminJWTPayload = {
  sub: string;
  username: string;
  role: 'admin';
};

export async function generateAdminToken(payload: AdminJWTPayload, expiresIn: string = '7d'): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = expiresIn === 'session' ? undefined : iat + parseExpiry(expiresIn);

  const signer = new SignJWT({ ...payload, iat, ...(exp ? { exp } : {}) });
  return await signer
    .setProtectedHeader({ alg: 'HS256' })
    .sign(getEncodedSecret());
}

export async function verifyAdminToken(token: string): Promise<AdminJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getEncodedSecret());
    if (payload.role !== 'admin' || typeof payload.username !== 'string' || typeof payload.sub !== 'string') {
      return null;
    }
    return payload as AdminJWTPayload;
  } catch {
    return null;
  }
}

function parseExpiry(text: string): number {
  // very small parser for 1d, 12h, 30m, 15s
  const match = /^([0-9]+)([smhd])$/.exec(text);
  if (!match) return 7 * 24 * 60 * 60; // default 7d
  const value = Number(match[1]);
  const unit = match[2];
  switch (unit) {
    case 's':
      return value;
    case 'm':
      return value * 60;
    case 'h':
      return value * 60 * 60;
    case 'd':
      return value * 24 * 60 * 60;
    default:
      return 7 * 24 * 60 * 60;
  }
}


