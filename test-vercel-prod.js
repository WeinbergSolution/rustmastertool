async function testVercel() {
  const url = "https://rustmastertool-web.vercel.app/auth/steam/callback?token_hash=test";
  const res = await fetch(url);
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
}
testVercel().catch(console.error);
