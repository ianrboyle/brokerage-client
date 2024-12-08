export async function deleteUserPositions(jwt: string): Promise<any> {
  try {
    const res = await fetch(`${process.env.POSITIONS_SERVICE_URL!}/positions`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `Authentication=${jwt}`,
      },
    });

    if (!res.ok) {
      console.error(`Error deleting positions: ${res.status} - ${res.statusText}`);
      const errorResponse = await res.text(); // Capture any error message
      console.error("Error details:", errorResponse);
    } else {
      console.log("Successfully deleted positions.");
    }
  } catch (error) {
    throw error;
  }
}
