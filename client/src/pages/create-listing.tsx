import { useEffect, useState } from "react";
import {
  useFirebaseAuthUser,
  useFirebaseStorage,
} from "../contexts/firebase-app-context";
import { useAPIClient } from "../hooks/api-client";
import { useNavigate } from "react-router-dom";
import { IListingForm, ListingFormDefault } from "../types/listing";
import { ref, uploadBytes } from "firebase/storage";

import ListingForm from "../components/listing-form-page/listing-form";

const CreateListingPage = () => {
  const client = useAPIClient();
  const user = useFirebaseAuthUser();
  const navigate = useNavigate();
  const storage = useFirebaseStorage();

  const [listingForm, setlistingForm] =
    useState<IListingForm>(ListingFormDefault);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errorForm, setErrorForm] = useState<string>("");

  useEffect(() => {
    if (user === null) navigate("/login");
  }, [user]);
  console.log(imageFiles);

  const createListingHandler = async (
    listingForm: IListingForm,
    imageFiles: File[]
  ) => {
    if (listingForm.schoolName === "") {
      return setErrorForm("MissingSchool");
    }
    if (listingForm.clothingType === "") {
      return setErrorForm("MissingType");
    }
    if (listingForm.size === "") {
      return setErrorForm("MissingSize");
    }
    if (listingForm.title === "") {
      return setErrorForm("MissingTitle");
    }
    if (listingForm.condition === "") {
      return setErrorForm("MissingCondition");
    }
    if (listingForm.description === "") {
      return setErrorForm("MissingSchool");
    }
    if (listingForm.price === 0) {
      return setErrorForm("MissingPrice");
    }

    const imagePaths = [];

    for (const imageFile of imageFiles) {
      imagePaths.push(imageFile.name);
    }

    if (imagePaths.length === 0) {
      return setErrorForm("MinimumOneImg");
    }

    await client.post("/listing", {
      ...listingForm,
      imagePaths: imagePaths,
    });

    for (const imageFile of imageFiles) {
      const imageFileRef = ref(storage, imageFile.name);
      await uploadBytes(imageFileRef, imageFile);
      imagePaths.push(imageFileRef.fullPath);
    }

    navigate("/shop/listings");
  };

  const saveAsDraft = async (listingForm: IListingForm, imageFiles: File[]) => {
    const imagePaths = listingForm.imagePaths || [];

    for (const imageFile of imageFiles) {
      imagePaths.push(imageFile.name);
    }

    await client.post("/draft", {
      ...listingForm,
      imagePaths: imagePaths,
    });

    if (imageFiles.length !== 0) {
      if (imageFiles.length !== 0) {
        for (const imageFile of imageFiles) {
          const imageFileRef = ref(storage, imageFile.name);
          await uploadBytes(imageFileRef, imageFile);
          imagePaths.push(imageFileRef.fullPath);
        }
      }
    }

    navigate("/shop/listings");
  };

  return (
    // <ListingForm form={{}} onSubmit={createListingHandler} action="Publish" />
    <div className="w-[80%]">
      <ListingForm
        listingForm={listingForm}
        setListingForm={setlistingForm}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
        errorForm={errorForm}
      />
      <div className="p-10">
        <button
          className="bg-white border-2 border-black text-black p-3 w-[25%] ml-auto rounded-sm text-[20px] flex justify-center hover:bg-black hover:text-white
           ease-in-out duration-150"
          onClick={() => saveAsDraft(listingForm, imageFiles)}
        >
          <div className="font-extrabold flex items-center">Save as draft</div>
        </button>
        <button
          className="publish-button mt-2 flex justify-center ml-auto rounded-sm"
          onClick={() => createListingHandler(listingForm, imageFiles)}
        >
          <div className="font-extrabold flex items-center">Publish</div>
        </button>
      </div>
    </div>
  );
};

export default CreateListingPage;
