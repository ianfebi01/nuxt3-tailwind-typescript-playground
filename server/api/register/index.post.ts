import { getQuery, readBody } from "h3";
import { authStore } from "~~/store/auth";
export default defineEventHandler(async (event) => {
  try {
    const auth = authStore();
    const body = await readBody(event);
    const res = await $fetch(`${process.env.NUXT_BASE_API}/api/v1/register`, {
      method: "post",
      body: JSON.stringify(body),
    });
    return res;
  } catch (err: any) {
    return {
      error: {
        statusMessage: err.statusMessage,
        statusCode: err.statusCode,
        data: err.data.error.errors,
      },
    };
  }
});
