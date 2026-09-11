// test_security_shield.js
// Comprehensive Security Shield Verification Suite for Link BD ISP

const BASE_URL = "http://localhost:5100";

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log("==========================================================");
  console.log("🛡️  LINK BD ISP CYBER SECURITY & DDOS SHIELD TEST SUITE");
  console.log("==========================================================");

  // 1. Health & Security Headers
  console.log("\n[Test 1] Health Check & Security Headers");
  const healthRes = await fetch(`${BASE_URL}/api/health`);
  assert(healthRes.status === 200, "Health check returns 200 OK");
  assert(healthRes.headers.get("x-request-id") !== null, "X-Request-ID header attached to response");
  assert(healthRes.headers.get("x-shield-protection") === "Active-L7", "X-Shield-Protection header indicates Active-L7");
  assert(healthRes.headers.get("x-shield-mode") === "normal", "X-Shield-Mode starts in normal mode");

  // 2. Malicious Bot & Scanner Blocker
  console.log("\n[Test 2] Malicious Bot & Scanner Blocker");
  const sqlmapRes = await fetch(`${BASE_URL}/api/site-data`, {
    headers: { "User-Agent": "sqlmap/1.5.2#stable (http://sqlmap.org)" }
  });
  assert(sqlmapRes.status === 403, "Sqlmap scanner rejected with 403 Forbidden");
  const sqlmapJson = await sqlmapRes.json();
  assert(sqlmapJson.error === "SCANNER_BLOCKED", "Response contains error code SCANNER_BLOCKED");

  const niktoRes = await fetch(`${BASE_URL}/api/site-data`, {
    headers: { "User-Agent": "Mozilla/5.0 (Nikto/2.1.6) (Security Scanner)" }
  });
  assert(niktoRes.status === 403, "Nikto scanner rejected with 403 Forbidden");

  const legitRes = await fetch(`${BASE_URL}/api/site-data`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" }
  });
  assert(legitRes.status === 200, "Legitimate browser request accepted with 200 OK");

  // 3. Sensitive Path Probing Trap
  console.log("\n[Test 3] Sensitive Path Probing Trap");
  const envRes = await fetch(`${BASE_URL}/.env`);
  assert(envRes.status === 404, "/.env probe blocked with safe 404 Not Found");

  const gitRes = await fetch(`${BASE_URL}/.git/config`);
  assert(gitRes.status === 404, "/.git probe blocked with safe 404 Not Found");

  const wpRes = await fetch(`${BASE_URL}/wp-admin/login.php`);
  assert(wpRes.status === 404, "/wp-admin probe blocked with safe 404 Not Found");

  // 4. Admin Login & SOC Authorization
  console.log("\n[Test 4] Admin Login & Security SOC Authorization");
  const unauthSecRes = await fetch(`${BASE_URL}/api/security/status`);
  assert(unauthSecRes.status === 401, "Unauthenticated request to /api/security/status rejected with 401");

  const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@linkbd.net", password: "admin123456" })
  });
  assert(loginRes.status === 200, "Admin login successful with 200 OK");
  const loginData = await loginRes.json();
  const token = loginData.token;
  assert(typeof token === "string" && token.length > 20, "Valid JWT auth token received");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  // 5. Security Status & Telemetry
  console.log("\n[Test 5] Security Telemetry & Telemetry Verification");
  const statusRes = await fetch(`${BASE_URL}/api/security/status`, { headers: authHeaders });
  assert(statusRes.status === 200, "SOC Status endpoint returns 200 OK");
  const statusJson = await statusRes.json();
  assert(statusJson.data.applicationShield === "ACTIVE", "Application Shield reports ACTIVE");
  assert(Array.isArray(statusJson.data.activeDefenses) && statusJson.data.activeDefenses.length >= 8, "Active defenses matrix reported with >=8 layers");

  const statsRes = await fetch(`${BASE_URL}/api/security/stats`, { headers: authHeaders });
  assert(statsRes.status === 200, "SOC Stats endpoint returns 200 OK");
  const statsJson = await statsRes.json();
  assert(statsJson.data.totalRequests > 0, `Total requests tracked: ${statsJson.data.totalRequests}`);
  assert(statsJson.data.botBlockedCount >= 2, `Bot blocks recorded: ${statsJson.data.botBlockedCount}`);

  // 6. Security Event Logs
  console.log("\n[Test 6] Security Incident Event Logs");
  const eventsRes = await fetch(`${BASE_URL}/api/security/events?limit=20`, { headers: authHeaders });
  assert(eventsRes.status === 200, "SOC Events endpoint returns 200 OK");
  const eventsJson = await eventsRes.json();
  assert(Array.isArray(eventsJson.data.events) && eventsJson.data.events.length > 0, "Security incidents logged in audit trail");
  console.log(`     Latest logged event: ${eventsJson.data.events[0]?.eventType} (${eventsJson.data.events[0]?.reason})`);

  // 7. Payment Replay & Idempotency Lock
  console.log("\n[Test 7] Payment Replay & Duplicate Transaction Protection");
  const uniqueTrx = `TRX-TEST-${Date.now()}`;
  const pay1Res = await fetch(`${BASE_URL}/api/settings/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: "LBD-TEST-01",
      phone: "01711223344",
      amount: 800,
      trxId: uniqueTrx
    })
  });
  assert(pay1Res.status === 200 || pay1Res.status === 201, "First payment submission accepted");

  // Replay attempt with same TrxID
  const pay2Res = await fetch(`${BASE_URL}/api/settings/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      customerId: "LBD-TEST-01",
      phone: "01711223344",
      amount: 800,
      trxId: uniqueTrx
    })
  });
  assert(pay2Res.status === 409, "Duplicate replay submission blocked with 409 Conflict");
  const pay2Json = await pay2Res.json();
  assert(pay2Json.error === "DUPLICATE_TRANSACTION", "Error code confirms DUPLICATE_TRANSACTION");

  // 8. Under Attack Mode Toggle
  console.log("\n[Test 8] Emergency 'Under Attack Mode' Toggle");
  const toggleOnRes = await fetch(`${BASE_URL}/api/security/toggle-attack-mode`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ mode: "under_attack" })
  });
  assert(toggleOnRes.status === 200, "Under Attack Mode toggled ON");
  const toggleOnData = await toggleOnRes.json();
  assert(toggleOnData.currentMode === "under_attack", "Current mode confirmed as 'under_attack'");

  // Check header on next request
  const checkHeaderRes = await fetch(`${BASE_URL}/api/health`);
  assert(checkHeaderRes.headers.get("x-shield-mode") === "under_attack", "Server reflects 'under_attack' mode in response headers");

  // Toggle back to normal
  const toggleOffRes = await fetch(`${BASE_URL}/api/security/toggle-attack-mode`, {
    method: "POST",
    headers: authHeaders,
    body: JSON.stringify({ mode: "normal" })
  });
  assert(toggleOffRes.status === 200, "Under Attack Mode toggled back to normal");
  const toggleOffData = await toggleOffRes.json();
  assert(toggleOffData.currentMode === "normal", "Current mode confirmed as 'normal'");

  // 9. Blacklist Clearing
  console.log("\n[Test 9] Blacklist & Quarantine Management");
  const clearRes = await fetch(`${BASE_URL}/api/security/clear-blacklist`, {
    method: "POST",
    headers: authHeaders
  });
  assert(clearRes.status === 200, "Clear blacklist endpoint returns 200 OK");

  console.log("\n==========================================================");
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==========================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error("Test runner encountered critical error:", err);
  process.exit(1);
});
