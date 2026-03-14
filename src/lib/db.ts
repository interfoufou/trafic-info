// Simple mock database for demo purposes
// In production, replace with a real database connection

export const db = {
  report: {
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  user: {
    findMany: async () => [],
    create: async () => ({}),
  },
  news: {
    findMany: async () => [],
    create: async () => ({}),
  },
  partner: {
    findMany: async () => [],
    create: async () => ({}),
  },
  emergencyRequest: {
    findMany: async () => [],
    create: async () => ({}),
  },
  policeStation: {
    findMany: async () => [],
    create: async () => ({}),
  },
};
