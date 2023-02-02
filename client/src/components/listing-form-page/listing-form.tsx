import { ReactNode, useState } from "react";
import { IListingForm } from "../../types/listing";
import { schools, clothingTypes, sizes, conditions } from "../../docs/options";
import { IoClose } from "react-icons/io5";
import { useDownloadUrls } from "../../hooks/use-download-urls";
import LoadingSpinner from "../status/loading-spinner";

interface ListingFormProperties {
  listingForm: IListingForm;
  setListingForm: (listingForm: IListingForm) => void;
  imageFiles: File[];
  setImageFiles: (imageFiles: File[]) => void;
  errorForm: string;
}

interface ListingSelectProperties {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string | undefined;
  handleInputChange: React.ChangeEventHandler<HTMLSelectElement>;
  errorForm: string;
}

interface ListingFieldProperties {
  title: string;
  subtitle: string;
  field: ReactNode;
}

interface ImageDroperProperties {
  listingForm: IListingForm;
  setListingForm: (listingForm: IListingForm) => void;
  imageFiles: File[];
  setImageFiles: (imageFiles: File[]) => void;
  errorForm: string;
}

const ImageDroper = ({
  listingForm,
  setListingForm,
  imageFiles,
  setImageFiles,
  errorForm,
}: ImageDroperProperties) => {
  const deleteImagePath = (image: string) => {
    // delete imagePath

    if (listingForm.imagePaths === undefined) return;

    const currentImages = [...listingForm.imagePaths];

    currentImages.splice(listingForm.imagePaths.indexOf(image), 1);

    setListingForm({
      ...listingForm,
      imagePaths: currentImages,
    });
  };

  const deleteImageFile = (file: File) => {
    // delete imageFile

    const currentFiles = [...imageFiles];

    currentFiles.splice(imageFiles.indexOf(file), 1);

    setImageFiles(currentFiles);
  };
  if (listingForm.imagePaths === undefined) {
    <div className="w-screen h-screen grid place-items-center">
      <LoadingSpinner classname="w-8 h-8" />
    </div>;
  }

  const imageUrls = useDownloadUrls(listingForm.imagePaths || []);

  return (
    <div className="w-full ml-auto mb-[1.5rem]">
      <p className="text-[16px] font-bold">Upload images of your item</p>
      <p className="text-[12px] mb-[1.5rem] font-light">The more the better.</p>
      <div className="grid grid-cols-3 gap-3 w-full">
        {(listingForm.imagePaths || []).map((imagePath, index) => {
          return (
            <div
              key={index}
              className="w-64 aspect-square group border bg-black border-black"
            >
              <IoClose
                onClick={() => deleteImagePath(imagePath)}
                className="hover:text-red-600 absolute scale-0 m-3 text-white group-hover:scale-100 z-[20]"
                size={32}
              />

              <img
                className="w-full h-full group-hover:opacity-60"
                src={imageUrls[index]}
                alt=""
              />
            </div>
          );
        })}
        {imageFiles.map((image, index) => {
          return (
            <div
              key={index}
              className="w-64 aspect-square group border bg-black border-black"
            >
              <IoClose
                onClick={() => deleteImageFile(image)}
                className="hover:text-red-600 absolute scale-0 m-3 text-white group-hover:scale-100 z-[20]"
                size={32}
              />

              <img
                className="w-full h-full group-hover:opacity-60 "
                src={URL.createObjectURL(image)}
                alt=""
              />
            </div>
          );
        })}
        <label htmlFor="dropzone-file" className="file-drop">
          <div className="flex flex-col justify-center items-center text-gray-400">
            <p className="mb-2 text-[12px] font-light">
              <span className="font-bold">Click to upload</span>
            </p>
          </div>
          <input
            id="dropzone-file"
            name="imageURL"
            type="file"
            className="hidden"
            onChange={(event) => {
              if (event.target.files === null) return;
              setImageFiles([...imageFiles, event.target.files[0]]);
            }}
          />
        </label>
      </div>
      {}
    </div>
  );
};

const ListingField = (props: ListingFieldProperties) => {
  return (
    <article className="flex justify-between my-8 w-full">
      <div className="w-[30%]">
        <p className="text-[16px] text-black">{props.title}</p>
        <p className="text-[10px] font-light">{props.subtitle}</p>
      </div>
      <div className="w-[60%]">{props.field}</div>
    </article>
  );
};

const ListingSelect = (props: ListingSelectProperties) => {
  return (
    <select
      className={
        props.value !== ""
          ? `select-button ${props.errorForm === props.label}`
          : `select-button text-gray-400`
      }
      value={props.value || ""}
      onChange={props.handleInputChange}
    >
      <option value="" disabled={true}>
        Select {props.label}
      </option>
      {props.options.map((option, key) => (
        <option key={key} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const ListingForm = ({
  listingForm,
  setListingForm,
  imageFiles,
  setImageFiles,
  errorForm,
}: ListingFormProperties) => {
  const setSchoolName = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      schoolName: event.target.value,
    });
  };
  const setClothingType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      clothingType: event.target.value,
    });
  };
  const setSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      size: event.target.value,
    });
  };
  const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingForm({
      ...listingForm,
      title: event.target.value,
    });
  };
  const setCondition = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setListingForm({
      ...listingForm,
      condition: event.target.value,
    });
  };

  const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setListingForm({
      ...listingForm,
      description: event.target.value,
    });
  };

  const setPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListingForm({
      ...listingForm,
      price: parseFloat(event.target.value),
    });
  };

  return (
    <div className="px-40 w-full py-10">
      {/* <section className="flex justify-center">
        <p className="text-[30px]">Create your listing by filling the form</p>
      </section> */}
      <p className="text-[30px] font-bold text-center">Listing Form</p>

      <section className="my-8">
        <p className="text-[20px]">Product Information</p>
        <hr className="bg-black h-[2px]" />

        <ListingField
          title="Institution"
          subtitle="Select the school which your uniform is from."
          field={
            <ListingSelect
              label="school"
              options={schools}
              value={listingForm.schoolName}
              handleInputChange={setSchoolName}
              errorForm={errorForm}
            />
          }
        />

        <ListingField
          title="Product Type"
          subtitle="Polo, T-Shirt, Skirt, etc."
          field={
            <ListingSelect
              label="type"
              options={clothingTypes}
              value={listingForm.clothingType}
              handleInputChange={setClothingType}
              errorForm={errorForm}
            />
          }
        />

        <ListingField
          title="Size"
          subtitle="Small, Medium, Large, etc."
          field={
            <ListingSelect
              label="size"
              options={sizes}
              value={listingForm.size}
              handleInputChange={setSize}
              errorForm={errorForm}
            />
          }
        />
        <ListingField
          title="Title"
          subtitle="Title is the first thing client will read, So it's important to be
        descriptive."
          field={
            <input
              className="input"
              type="text"
              placeholder="ex: Large Black Hoodie from Notre Dame 4-5 years old..."
              value={listingForm.title || ""}
              onChange={setTitle}
            />
          }
        />
      </section>
      <section className="my-8">
        <p className="text-[20px]">Product Detail</p>
        <hr className="bg-black h-[2px]" />

        <ListingField
          title="Condition"
          subtitle="Small, Medium, Large, etc."
          field={
            <ListingSelect
              label="condition"
              options={conditions}
              value={listingForm.condition}
              handleInputChange={setCondition}
              errorForm={errorForm}
            />
          }
        />

        <ListingField
          title="Description"
          subtitle="
        Describe your listing: the more details, the better for buyers!
        "
          field={
            <textarea
              className="text-area"
              rows={10}
              placeholder="Describe your uniform..."
              value={listingForm.description || ""}
              onChange={setDescription}
            ></textarea>
          }
        />
        <ListingField
          title="Price"
          subtitle="Think of price, buyers will buy your product at."
          field={
            <div className="flex items-center border w-[20%] p-2 border-black text-[20px]">
              <p className="price-color">$</p>
              <input
                className="price-input text-[20px]"
                type="text"
                placeholder="0.00"
                value={listingForm.price || ""}
                onChange={setPrice}
              />
            </div>
          }
        />
        <ImageDroper
          listingForm={listingForm}
          setListingForm={setListingForm}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          errorForm={errorForm}
        />
      </section>
    </div>
  );
};

export default ListingForm;
