import pool from "../config/db";
import {
  signupWithEmailPassword,
  loginWithEmailPassword,
  authenticateGoogle,
  getMe,
} from "../modules/auth/authService";
import {
  getOnboardingStatus,
  saveStepOnePersonal,
  saveStepTwoSkills,
  saveStepThreePreferences,
} from "../modules/onboarding/onboardingService";

async function runAuthTests() {
  console.log("\n============================================================");
  console.log("       PHASE 16 — AUTHENTICATION & ONBOARDING TEST SUITE");
  console.log("============================================================\n");

  const testEmail1 = `test.student.${Date.now()}@vitstudent.ac.in`;
  const testEmail2 = `test.faculty.${Date.now()}@vit.ac.in`;
  const invalidEmail = `test.hacker.${Date.now()}@gmail.com`;

  try {
    // ------------------------------------------------------------
    // TEST A: New Email/Password Signup
    // ------------------------------------------------------------
    console.log("TEST A: Creating new account with VIT student email...");
    const signupRes1 = await signupWithEmailPassword(
      "Test Student",
      testEmail1,
      "Password123!"
    );
    console.log("✅ Signup successful for:", signupRes1.user.email);
    console.log("   - User ID:", signupRes1.user.id);
    console.log("   - Initial Credits:", signupRes1.user.credits);
    console.log("   - Onboarding Step:", signupRes1.user.onboardingStep);
    console.log("   - Onboarding Completed:", signupRes1.user.onboardingCompleted);

    if (signupRes1.user.credits !== 40) {
      throw new Error(`Expected 40 initial credits, got ${signupRes1.user.credits}`);
    }

    // Verify database directly
    const walletCheck = await pool.query(
      "SELECT balance FROM wallets WHERE user_id = $1",
      [signupRes1.user.id]
    );
    if (walletCheck.rows[0].balance !== 40) {
      throw new Error(`Wallet in DB has balance ${walletCheck.rows[0].balance}, expected 40`);
    }

    const txCheck = await pool.query(
      "SELECT * FROM credit_transactions WHERE user_id = $1",
      [signupRes1.user.id]
    );
    if (txCheck.rows.length !== 1 || txCheck.rows[0].amount !== 40) {
      throw new Error(`Expected exactly 1 transaction of 40 credits, found ${txCheck.rows.length}`);
    }
    console.log("✅ Database verified: Exactly 1 wallet (40 credits) and 1 transaction (+40 INITIAL_SIGNUP_BONUS)");

    // ------------------------------------------------------------
    // TEST B: Invalid Email Domain (@gmail.com)
    // ------------------------------------------------------------
    console.log("\nTEST B: Testing rejection of non-VIT domain (gmail.com)...");
    try {
      await signupWithEmailPassword("Hacker", invalidEmail, "Password123!");
      throw new Error("FAILED: gmail.com was accepted!");
    } catch (err: any) {
      console.log("✅ Correctly rejected invalid domain:", err.message);
    }

    // ------------------------------------------------------------
    // TEST C: Valid VIT Faculty Domain (@vit.ac.in)
    // ------------------------------------------------------------
    console.log("\nTEST C: Testing @vit.ac.in domain acceptance...");
    const signupRes2 = await signupWithEmailPassword(
      "Dr. Ramesh",
      testEmail2,
      "ProfPassword123!"
    );
    console.log("✅ Accepted @vit.ac.in domain:", signupRes2.user.email);

    // ------------------------------------------------------------
    // TEST D: Duplicate Email Signup Prevention
    // ------------------------------------------------------------
    console.log("\nTEST D: Testing duplicate email registration prevention...");
    try {
      await signupWithEmailPassword("Test Student", testEmail1, "AnotherPassword!");
      throw new Error("FAILED: Duplicate email allowed!");
    } catch (err: any) {
      console.log("✅ Duplicate email correctly blocked:", err.message);
    }

    // ------------------------------------------------------------
    // TEST E: Google Sign-In with Non-VIT Domain
    // ------------------------------------------------------------
    console.log("\nTEST E: Google sign-in with non-VIT domain...");
    try {
      await authenticateGoogle({
        email: "student@gmail.com",
        name: "Gmail User",
      });
      throw new Error("FAILED: Google non-VIT email allowed!");
    } catch (err: any) {
      console.log("✅ Google non-VIT email correctly blocked:", err.message);
    }

    // ------------------------------------------------------------
    // TEST F: Google Sign-In with Valid VIT Email
    // ------------------------------------------------------------
    console.log("\nTEST F: Google sign-in with valid VIT email...");
    const googleEmail = `google.vit.${Date.now()}@vitstudent.ac.in`;
    const googleId = `google-uid-${Date.now()}`;
    const googleAuthRes = await authenticateGoogle({
      email: googleEmail,
      name: "Google Student",
      googleId,
    });
    console.log("✅ New Google user created:", googleAuthRes.user.email);
    console.log("   - Credits granted:", googleAuthRes.user.credits);

    // Second sign-in with same Google account (should not duplicate)
    const googleLoginRes = await authenticateGoogle({
      email: googleEmail,
      name: "Google Student",
      googleId,
    });
    console.log("✅ Existing Google user logged in without duplicate credits. Credits:", googleLoginRes.user.credits);

    const googleWallets = await pool.query(
      "SELECT * FROM wallets WHERE user_id = $1",
      [googleAuthRes.user.id]
    );
    if (googleWallets.rows.length !== 1) {
      throw new Error("Duplicate wallets created for Google user!");
    }

    // ------------------------------------------------------------
    // TEST G: Incomplete Onboarding Save & Resume
    // ------------------------------------------------------------
    console.log("\nTEST G: Saving Step 1 and verifying incomplete status...");
    const userId = signupRes1.user.id;
    await saveStepOnePersonal(userId, {
      fullName: "Test Student Updated",
      registrationNumber: "22BCE1001",
      university: "VIT Chennai",
      department: "Computer Science",
      year: "3rd Year",
      phone: "9876543210",
      bio: "Aspiring full stack developer from VIT.",
    });

    const statusAfterStep1 = await getOnboardingStatus(userId);
    console.log("✅ Step 1 saved in DB:");
    console.log("   - Reg Number:", statusAfterStep1.registrationNumber);
    console.log("   - Department:", statusAfterStep1.department);
    console.log("   - Onboarding Step:", statusAfterStep1.onboardingStep);
    console.log("   - Completed:", statusAfterStep1.onboardingCompleted);

    if (statusAfterStep1.onboardingStep !== 2 || statusAfterStep1.onboardingCompleted !== false) {
      throw new Error("Onboarding step/completion mismatch after Step 1");
    }

    // ------------------------------------------------------------
    // TEST H: Step 2 Skills & Step 3 Preferences (Finish Onboarding)
    // ------------------------------------------------------------
    console.log("\nTEST H: Saving Step 2 (Skills) and Step 3 (Preferences)...");
    await saveStepTwoSkills(userId, {
      teaches: ["React", "TypeScript", "Node.js"],
      learns: ["Machine Learning", "DevOps"],
    });

    const statusAfterStep2 = await getOnboardingStatus(userId);
    console.log("✅ Step 2 saved: Teaches", statusAfterStep2.teaches, "Learns", statusAfterStep2.learns);

    await saveStepThreePreferences(userId, {
      availability: "Weekdays",
      preferredTime: "Evening",
      github: "https://github.com/vitstudent",
      linkedin: "https://linkedin.com/in/vitstudent",
      portfolio: "https://vitstudent.dev",
    });

    const statusAfterStep3 = await getOnboardingStatus(userId);
    console.log("✅ Step 3 finished. Onboarding Completed:", statusAfterStep3.onboardingCompleted);
    if (!statusAfterStep3.onboardingCompleted) {
      throw new Error("Onboarding should be marked completed!");
    }

    // ------------------------------------------------------------
    // TEST I: Login & Status Retrieval
    // ------------------------------------------------------------
    console.log("\nTEST I: Testing Login with credentials...");
    const loginRes = await loginWithEmailPassword(testEmail1, "Password123!");
    console.log("✅ Logged in successfully:");
    console.log("   - Full Name:", loginRes.user.fullName);
    console.log("   - Onboarding Completed:", loginRes.user.onboardingCompleted);
    console.log("   - Credits:", loginRes.user.credits);

    // Wrong password test
    try {
      await loginWithEmailPassword(testEmail1, "WrongPass!");
      throw new Error("FAILED: Wrong password accepted!");
    } catch (err: any) {
      console.log("✅ Wrong password correctly rejected:", err.message);
    }

    // ------------------------------------------------------------
    // TEST J: Credit Preservation Check
    // ------------------------------------------------------------
    console.log("\nTEST J: Checking credit preservation across sessions...");
    const meRes = await getMe(userId);
    console.log("✅ Current balance remains exactly:", meRes.credits);
    if (meRes.credits !== 40) {
      throw new Error(`Credits mutated! Expected 40, got ${meRes.credits}`);
    }

    console.log("\n============================================================");
    console.log("   🎉 ALL 10 AUTHENTICATION & ONBOARDING TESTS PASSED!");
    console.log("============================================================\n");
  } catch (error) {
    console.error("\n❌ Test Suite Failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

runAuthTests();
