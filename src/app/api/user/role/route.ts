import { NextResponse } from 'next/server';
import { adminAuth, firestore } from '../../../../firebase/admin';

export async function GET(req: Request) {
  try {
    // Assuming the user is sending a valid Firebase ID token via headers
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Get the user's role from Firestore
    const userDoc = await firestore.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json({ role: 'user' }, { status: 200 });
    }

    const userData = userDoc.data();
    const role = userData?.role || 'user';

    return NextResponse.json({ role }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}