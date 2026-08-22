// In-memory fallback database for dev mode when TiDB Cloud connection is unreachable
export interface InMemUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  loginId: string;
  password: string;
  companyId: string;
  roleName: 'ADMIN' | 'HR' | 'EMPLOYEE';
  isFirstLogin: boolean;
  departmentName?: string;
  createdAt: Date;
}

export interface InMemCompany {
  id: string;
  name: string;
  logoUrl?: string | null;
  createdAt: Date;
}

export const inMemStore = {
  companies: [
    {
      id: 'comp-1',
      name: 'Acme Inc',
      logoUrl: null,
      createdAt: new Date(),
    }
  ] as InMemCompany[],
  users: [
    {
      id: 'user-admin-1',
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@acme.com',
      loginId: 'ACME-AU-2026-0001',
      password: '$2a$10$wN1Q/X84q3q4j/E0W8E.l.j6mKxT1e1x4Lh0P3N0K3s0a0b0c0d0e',
      companyId: 'comp-1',
      roleName: 'ADMIN',
      isFirstLogin: false,
      createdAt: new Date(),
    },
    {
      id: 'user-emp-1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@acme.com',
      loginId: 'ACME-JD-2026-0002',
      password: '$2a$10$wN1Q/X84q3q4j/E0W8E.l.j6mKxT1e1x4Lh0P3N0K3s0a0b0c0d0e',
      companyId: 'comp-1',
      roleName: 'EMPLOYEE',
      isFirstLogin: true,
      createdAt: new Date(),
    }
  ] as InMemUser[],
  attendances: [] as any[],
  salaries: [] as any[],
};
