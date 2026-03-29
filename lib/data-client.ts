import { db } from '@/firebase';
import { doc, getDoc, setDoc, collection, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';

export async function loadData(key: string, defaultValue: any) {
  try {
    if (key === 'buna_products') {
      const snapshot = await getDocs(collection(db, 'products'));
      if (snapshot.empty) {
        // Initialize with default
        await saveData(key, defaultValue);
        return defaultValue;
      }
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } else {
      const docRef = doc(db, 'settings', key.replace('buna_', ''));
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        await saveData(key, defaultValue);
        return defaultValue;
      }
    }
  } catch (e) {
    console.error('Error loading data from Firestore:', e);
    return defaultValue;
  }
}

export async function saveData(key: string, data: any) {
  try {
    if (key === 'buna_products') {
      const batch = writeBatch(db);
      const productsRef = collection(db, 'products');
      
      // Get existing to delete ones that are removed
      const existing = await getDocs(productsRef);
      const existingIds = existing.docs.map(d => d.id);
      const newIds = data.map((p: any) => p.id);
      
      // Delete removed
      for (const id of existingIds) {
        if (!newIds.includes(id)) {
          batch.delete(doc(db, 'products', id));
        }
      }
      
      // Set new/updated
      for (const item of data) {
        const { id, ...rest } = item;
        batch.set(doc(db, 'products', id || Date.now().toString()), rest);
      }
      
      await batch.commit();
    } else {
      const docRef = doc(db, 'settings', key.replace('buna_', ''));
      await setDoc(docRef, data);
    }
  } catch (e) {
    console.error('Error saving data to Firestore:', e);
  }
}
