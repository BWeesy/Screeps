const createName = (role: string): string => `${role}${(Number(Math.random().toFixed(3)) * 1000).toString()}`;

export default createName;
