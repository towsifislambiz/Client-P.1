// test_api_endpoints.js
// Test HTTP REST Endpoints on Express Server

import http from "http";
import app from "./server/server.js";

const server = app.listen(5099, async () => {
  console.log("Test HTTP server started on port 5099");
  let passed = 0;
  let failed = 0;

  function assert(cond, msg) {
    if (cond) {
      console.log(`[HTTP PASS] ${msg}`);
      passed++;
    } else {
      console.error(`[HTTP FAIL] ${msg}`);
      failed++;
    }
  }

  async function request(path, options = {}, body = null) {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "localhost",
          port: 5099,
          path,
          method: options.method || "GET",
          headers: options.headers || {}
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve({ status: res.statusCode, body: JSON.parse(data) });
            } catch {
              resolve({ status: res.statusCode, raw: data });
            }
          });
        }
      );
      req.on("error", reject);
      if (body) {
        req.write(typeof body === "string" ? body : JSON.stringify(body));
      }
      req.end();
    });
  }

  try {
    // 1. GET /api/site-data
    const siteDataRes = await request("/api/site-data");
    assert(siteDataRes.status === 200 && siteDataRes.body?.success === true, "GET /api/site-data returns 200 OK");
    assert(siteDataRes.body?.data?.packages?.length >= 7, "site-data contains packages");
    assert(siteDataRes.body?.data?.branding?.navbarLogo, "site-data contains branding");

    // 2. Unauthenticated POST to protected route should fail with 401
    const unauthRes = await request("/api/packages", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, { name: "Hacker Pkg", price: 100 });
    assert(unauthRes.status === 401, "Unauthenticated access rejected with 401");

    // 3. Login with valid credentials
    const loginRes = await request("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, { email: "admin@linkbd.net", password: "admin123456" });
    assert(loginRes.status === 200 && loginRes.body?.token, "POST /api/auth/login succeeds with JWT token");
    const token = loginRes.body?.token;

    // 4. GET /api/auth/me with Bearer token
    const meRes = await request("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    assert(meRes.status === 200 && meRes.body?.admin?.email === "admin@linkbd.net", "GET /api/auth/me returns admin profile");

    // 5. Public Lead Submission
    const inqRes = await request("/api/settings/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      name: "Test Customer",
      phone: "01711000000",
      package: "Gold+ 80 Mbps",
      address: "উত্তরা, ঢাকা"
    });
    assert(inqRes.status === 201 && inqRes.body?.success, "Public inquiry submission works via POST /api/settings/inquiries");

    // 6. Public Bill Pay Submission
    const payRes = await request("/api/settings/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    }, {
      customerId: "LBD-8888",
      phone: "01711000000",
      amount: 1050,
      method: "bKash",
      trxId: "TRX998877"
    });
    assert(payRes.status === 201 && payRes.body?.success, "Public bill pay submission works via POST /api/settings/payments");

    console.log("==================================================");
    console.log(`HTTP TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log("==================================================");
  } catch (err) {
    console.error("HTTP Test Error:", err);
    failed++;
  } finally {
    server.close(() => {
      console.log("Test HTTP server closed");
      process.exit(failed === 0 ? 0 : 1);
    });
  }
});
