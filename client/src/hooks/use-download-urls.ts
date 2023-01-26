import { useMemo, useState } from "react";
import { useFirebaseStorage } from "../contexts/firebase-app-context";
import { getDownloadURL, ref } from "firebase/storage";

export const useDownloadUrls = (imagePaths: string[]) => {
  const storage = useFirebaseStorage();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useMemo(async () => {
    if (imagePaths.length === 0) return [];
    setImageUrls(
      await Promise.all(
        imagePaths.map(
          async (imagePath) => await getDownloadURL(ref(storage, imagePath))
        )
      )
    );
  }, [imagePaths]);

  return imageUrls;
};
