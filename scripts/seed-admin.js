const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Look for service account key in current folder
const serviceAccountPath = path.join(process.cwd(), 'service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error('\n❌ ERROR: service-account.json not found in the root directory!');
  console.log('Please download your service account JSON key from Firebase Console -> Project Settings -> Service Accounts,');
  console.log('save it as "service-account.json" in the root of your project, and run this script again.\n');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log('\n🚀 Wisdom Kwati Smart City - Admin Account Creator');
  console.log('Usage: node scripts/seed-admin.js <email> <password>');
  console.log('Example: node scripts/seed-admin.js admin@wksmartcity.com SuperSecretPassword123\n');
  process.exit(0);
}

if (password.length < 6) {
  console.error('\n❌ ERROR: Password must be at least 6 characters long.\n');
  process.exit(1);
}

console.log(`\nCreating admin account for ${email}...`);

admin.auth().createUser({
  email: email,
  emailVerified: true,
  password: password,
  displayName: "WKSC Administrator",
  disabled: false
})
.then((userRecord) => {
  console.log(`\n✅ SUCCESS: Admin user created successfully!`);
  console.log(`User ID: ${userRecord.uid}`);
  console.log(`Email: ${userRecord.email}\n`);
  process.exit(0);
})
.catch((error) => {
  console.error(`\n❌ ERROR: Failed to create user:`, error.message);
  process.exit(1);
});
