export interface OtpState {
  otpHash: string;
  expiresAt: number; // epoch ms
  attempts: number;
  lastSentAt: number;
}

export interface AdminAccount {
  username: string;
  email: string;
  passwordHash: string; // format: scrypt:salt:hash
  mustChangePassword: boolean;
  failedAttempts: number;
  lockoutUntil: number | null; // epoch ms
  updatedAt: string;
  recoveryCodeHash?: string | null;
  failedRecoveryAttempts?: number;
  recoveryLockoutUntil?: number | null;
  sessionVersion?: number;
  otpState?: OtpState | null;
}

export interface SessionPayload {
  user: string;
  timestamp: number;
  mustChangePassword: boolean;
  sessionVersion?: number;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword: string;
  recoveryCode?: string;
}

