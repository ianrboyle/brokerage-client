export async function signout() {
  let result = null,
    error = null;
  try {
    result = await fetch(`${process.env.AUTH_SERVICE_URL!}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status !== 201) {
      throw new Error(`Failed to log out: ${result.status}`);
    }
  } catch (e) {
    error = e;
    console.log("HELLO:", { result: null, error: error });
    return { result: null, error: error };
  }
}
