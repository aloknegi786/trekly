import admin from 'firebase-admin';

// Initialize the SDK if it hasn't been initialized yet
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

// Export the specific tools you'll use in Server Actions
console.log("Project ID:", process.env.FIREBASE_PROJECT_ID);
console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("Key Exists?:", !!process.env.FIREBASE_PRIVATE_KEY);

// If any of these are undefined, the Admin SDK will throw that error.
export const authAdmin: admin.auth.Auth = admin.auth();
export const dbAdmin: admin.firestore.Firestore = admin.firestore();
export default admin;