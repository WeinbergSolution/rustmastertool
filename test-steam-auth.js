async function test() {
  const url = "https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/steam-auth?action=login&origin=https%3A%2F%2Frustmastertool-web.vercel.app";
  const res = await fetch(url, { redirect: "manual" });
  console.log("Production Origin:");
  console.log("Status:", res.status);
  console.log("CORS Header:", res.headers.get("Access-Control-Allow-Origin"));
  console.log("Location:", res.headers.get("Location"));
  console.log("Body:", await res.text());

  console.log("---");

  const urlLocal1 = "https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/steam-auth?action=login&origin=http%3A%2F%2Flocalhost%3A5173";
  const resLocal1 = await fetch(urlLocal1, { redirect: "manual" });
  console.log("Localhost 5173:");
  console.log("Status:", resLocal1.status);
  console.log("CORS Header:", resLocal1.headers.get("Access-Control-Allow-Origin"));
  console.log("Location:", resLocal1.headers.get("Location"));
  
  console.log("---");
  
  const urlLocal2 = "https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/steam-auth?action=login&origin=http%3A%2F%2Flocalhost%3A5174";
  const resLocal2 = await fetch(urlLocal2, { redirect: "manual" });
  console.log("Localhost 5174:");
  console.log("Status:", resLocal2.status);
  console.log("CORS Header:", resLocal2.headers.get("Access-Control-Allow-Origin"));
  console.log("Location:", resLocal2.headers.get("Location"));
}

test().catch(console.error);
