async function testOrigins() {
  const origins = [
    "https://rustmastertool-web.vercel.app",
    "https://rustmastertool-web-git-main-pascals-projects-8f00c30a.vercel.app",
    "https://rustmastertool-web-git-feature-36abe6-pascals-projects-8f00c30a.vercel.app"
  ];
  
  for (const origin of origins) {
    const url = `https://fcmjevwfuwzqtpozwigf.supabase.co/functions/v1/steam-auth?action=login&origin=${encodeURIComponent(origin)}`;
    console.log(`Testing: ${origin}`);
    try {
      const res = await fetch(url, { redirect: "manual" });
      if (res.status === 403) {
         console.log("FAIL: 403 Forbidden (Invalid origin)");
      } else if (res.status === 302 || res.status === 200) {
         console.log("SUCCESS: Origin accepted (Status: " + res.status + ")");
      } else {
         console.log("UNKNOWN STATUS: " + res.status);
      }
    } catch (e) {
      console.log("ERROR:", e.message);
    }
    console.log("---");
  }
}
testOrigins().catch(console.error);
