export const validateEmail = (email) => {
  const reg = /@/i;
  return reg.test(email);
}
export const gitInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initial = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initial += words[i][0];
  }
  return initial.toUpperCase();
};