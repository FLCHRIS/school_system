export const generateEnrollmentNumber = (
  schoolCode: string,
  sequence: number
) => {
  const shortYear = new Date().getFullYear().toString().slice(2, 4);

  const paddedSequence = sequence.toString().padStart(5, "0");

  return `${schoolCode}-${shortYear}-${paddedSequence}`;
};
