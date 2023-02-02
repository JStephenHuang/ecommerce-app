import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFirebaseAuthUser,
  useFirebaseStorage,
} from "../contexts/firebase-app-context";
import { useAPIClient } from "../hooks/api-client";
import { useQuery } from "react-query";
import { IListingForm } from "../types/listing";

import ListingForm from "../components/listing-form-page/listing-form";
import LoadingSpinner from "../components/status/loading-spinner";
import { ref, uploadBytes } from "firebase/storage";

const EditListingPage = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();
  const storage = useFirebaseStorage();
  const listingId = useParams().id;

  const [listingForm, setlistingForm] = useState<IListingForm>({});
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (images: File[]) => {
    setImageFiles(images);
  };

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);

  const getListingForm = async () => {
    const res = await client.get(`/listing/form/${listingId}`);
    return res.data;
  };

  const { data, status } = useQuery<IListingForm>(
    "getListingForm",
    getListingForm
  );

  useEffect(() => {
    if (data !== undefined) {
      setlistingForm(data);
    }
  }, [data]);

  if (status === "loading") {
    return (
      <div className="h-[80%] grid place-items-center">
        <LoadingSpinner classname="w-16 h-16" />
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="h-[80%] grid place-items-center">
        Listing form not found
      </div>
    );
  }

  const updateListing = async (
    listingForm: IListingForm,
    imageFiles: File[]
  ) => {
    const imagePaths = listingForm.imagePaths || [];

    for (const imageFile of imageFiles) {
      imagePaths.push(imageFile.name);
    }

    await client.put(`/listing/${listingId}`, {
      ...listingForm,
      imagePaths: imagePaths,
    });

    for (const imageFile of imageFiles) {
      const imageFileRef = ref(storage, imageFile.name);
      await uploadBytes(imageFileRef, imageFile);
    }
    navigate("/shop/listings");
  };

  const updateDraft = async (listingForm: IListingForm, imageFiles: File[]) => {
    const imagePaths = listingForm.imagePaths || [];

    for (const imageFile of imageFiles) {
      imagePaths.push(imageFile.name);
    }

    await client.put(`/draft/${listingId}`, {
      ...listingForm,
      imagePaths: imagePaths,
    });

    if (imageFiles.length !== 0) {
      for (const imageFile of imageFiles) {
        const imageFileRef = ref(storage, imageFile.name);
        await uploadBytes(imageFileRef, imageFile);
      }
    }
    navigate("/shop/listings");
  };

  return (
    <div className="w-4/5">
      <ListingForm
        listingForm={listingForm}
        setListingForm={setlistingForm}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        errorForm=""
      />
      <div className="p-10">
        <button
          className="bg-white border-2 border-black text-black p-3 w-[25%] ml-auto rounded-sm text-[20px] flex justify-center hover:bg-black hover:text-white
         ease-in-out duration-150"
          onClick={() => updateDraft(listingForm, imageFiles)}
        >
          <div className="font-extrabold flex items-center">Save as draft</div>
        </button>
        <button
          className="publish-button mt-2 flex justify-center ml-auto rounded-sm"
          onClick={() => updateListing(listingForm, imageFiles)}
        >
          <div className="font-extrabold flex items-center">
            Save and Publish
          </div>
        </button>
      </div>
    </div>
  );
};

export default EditListingPage;
