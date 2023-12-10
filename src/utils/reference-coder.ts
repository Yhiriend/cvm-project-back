export const generateRefCode = (element1: string, element2: string): string => {
  return (
    new Date().toISOString().replace(/[-:.]/g, "") +
    "U" +
    element1 +
    "C" +
    element2
  );
};
