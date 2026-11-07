export interface AdminAccount {
  username: string;
  email: string;
  passwordHash: string; // format: scrypt:salt:hash
  mustChangePassword: boolean;
  failedAttempts: number;
  lockoutUntil: number | null; // epoch ms
  updatedAt: string;
  recoveryCodeHash?: string;
}

export interface SessionPayload {
  user: string;
  timestamp: number;
  mustChangePassword: boolean;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword: string;
  recoveryCode?: string;
}
