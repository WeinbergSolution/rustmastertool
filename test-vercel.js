async function testVercel() {
  const url = "https://rustmastertool-web-git-feature-36abe6-pascals-projects-8f00c30a.vercel.app/auth/steam/callback?token_hash=test";
  const res = await fetch(url);
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
}
testVercel().catch(console.error);
