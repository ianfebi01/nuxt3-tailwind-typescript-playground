export default defineEventHandler(async (event) => {
  const res = await $fetch("https://basristone-be.ianfebi01.tech/getAllPosts", {
    method: "get",
  });
  return res;
});
