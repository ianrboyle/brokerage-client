import { SignUpData } from "../app/signup/page";

export async function signUp(signUpData: SignUpData) {
  let result = null,
    error = null;
  try {
    result = await fetch(`${process.env.AUTH_SERVICE_URL!}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpData),
    });
    if (result.status !== 201) {
      throw new Error(`Failed to sign up: ${result.status}`);
    }

    // If response status is 201 Created, extract JWT from response headers and save it in a cookie

    // Save JWT token in a cookie

    const data = await result.json();

    return data;
  } catch (e) {
    error = e;
    console.log("HELLO:", { result: null, error: error });
    return { result: null, error: error };
  }
}
