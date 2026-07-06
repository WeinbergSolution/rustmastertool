async function testCors() {
  const url = "https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/steam-auth?action=login&origin=https%3A%2F%2Frustmastertool-web.vercel.app";
  const res = await fetch(url, { 
    method: "OPTIONS",
    headers: {
      "Origin": "https://rustmastertool-web.vercel.app"
    }
  });
  console.log("OPTIONS Production Origin:");
  console.log("Status:", res.status);
  console.log("CORS Header:", res.headers.get("Access-Control-Allow-Origin"));
}
testCors().catch(console.error);
