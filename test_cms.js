// test_cms.js
// Automated End-to-End Verification Test for Link BD CMS Backend

import http from "http";
import dataService from "./server/services/dataService.js";
import { generateToken } from "./server/middleware/authMiddleware.js";

async function runTests() {
  console.log("==================================================");
  console.log("   STARTING LINK BD CMS VERIFICATION TEST SUITE   ");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. DataService site data check
  const siteData = dataService.getSiteData();
  assert(siteData.branding?.navbarLogo === "/assets/logo.png", "TEST 1: Default Header Logo loaded correctly");
  assert(siteData.branding?.footerLogo === "/assets/logo-footer.png", "TEST 2: Default Footer Logo loaded correctly");
  assert(siteData.packages.length >= 7, `TEST 3: Packages loaded (Total: ${siteData.packages.length})`);
  assert(siteData.offices.length >= 4, `TEST 4: Authentic 4 Offices loaded (Total: ${siteData.offices.length})`);
  assert(siteData.images.length >= 17, `TEST 5: Page-by-Page Images loaded (Total: ${siteData.images.length})`);

  // 2. Package CRUD & Validation
  const initialSilver = dataService.getPackageById("silver-plus");
  assert(initialSilver?.price === 890, "TEST 6: Initial Silver+ price is 890 BDT");

  // Update Package Price
  dataService.updatePackage("silver-plus", { price: 950 });
  const updatedSilver = dataService.getPackageById("silver-plus");
  assert(updatedSilver?.price === 950, "TEST 7: Silver+ price updated to 950 BDT successfully");

  // Create New Package
  const testPkg = dataService.createPackage({
    id: "test-ultra-pkg",
    name: "Ultra Fiber 500",
    speed: 500,
    price: 6000,
    category: "pro",
    badge: "Special"
  });
  assert(testPkg?.name === "Ultra Fiber 500", "TEST 8: New Package creation works");

  // Toggle Inactive
  dataService.updatePackage("test-ultra-pkg", { isActive: false });
  const inactivePkg = dataService.getPackageById("test-ultra-pkg");
  assert(inactivePkg?.isActive === false, "TEST 9: Package Hide / Inactive toggle works");

  // Delete Package
  dataService.deletePackage("test-ultra-pkg");
  const deletedCheck = dataService.getPackageById("test-ultra-pkg");
  assert(deletedCheck === undefined, "TEST 10: Package deletion works safely");

  // Reset Packages
  dataService.resetPackages();
  const resetSilver = dataService.getPackageById("silver-plus");
  assert(resetSilver?.price === 890, "TEST 11: Reset packages to default restores 890 BDT price");

  // 3. Office & Contact Updates
  const headOffice = dataService.getOfficeById("head-office");
  assert(headOffice?.city.includes("উত্তরা"), "TEST 12: Authentic Head Office in Uttara Dhaka confirmed");

  dataService.updateContact({ mainHotline: "+8801995-999999" });
  assert(dataService.getContact().mainHotline === "+8801995-999999", "TEST 13: Global Hotline update works");

  dataService.resetContact();
  assert(dataService.getContact().mainHotline === "+8801995-648616", "TEST 14: Global Hotline reset works");

  // 4. Image Updates & Resets
  dataService.updateImage("home_slide1", "/uploads/custom-home.png");
  assert(dataService.getImageById("home_slide1")?.currentUrl === "/uploads/custom-home.png", "TEST 15: Image replacement works");

  dataService.resetImage("home_slide1");
  assert(dataService.getImageById("home_slide1")?.currentUrl === "/assets/hero-home.png", "TEST 16: Image reset to default works");

  // 5. Logo Updates & Resets
  dataService.updateBranding({ navbarLogo: "/uploads/new-logo.png" });
  assert(dataService.getBranding().navbarLogo === "/uploads/new-logo.png", "TEST 17: Header Logo update works");

  dataService.resetBranding("navbarLogo");
  assert(dataService.getBranding().navbarLogo === "/assets/logo.png", "TEST 18: Header Logo reset works");

  // 6. Backup & Recovery
  const backupName = dataService.createBackup("test");
  assert(typeof backupName === "string" && backupName.startsWith("backup-"), "TEST 19: Automatic Backup generation works");
  const backupList = dataService.listBackups();
  assert(backupList.length > 0, "TEST 20: Backup listing works");

  // 7. Security & JWT Token Verification
  const token = generateToken({ email: "admin@linkbd.net", role: "admin" });
  assert(typeof token === "string" && token.length > 20, "TEST 21: JWT Token generation works");

  console.log("==================================================");
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
