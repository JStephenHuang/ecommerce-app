import React, { useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { ListingFormType } from "../../../types/listing";

interface ImageDroperProperties {
  sellForm: ListingFormType;
  handleInputChange: (event: any) => void;
}

function ImageDroper(props: ImageDroperProperties) {
  const [images, setImages] = useState<Array<File>>([]);

  const uploadImgHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedImg = event.target.files[0];
      setImages((images) => [...images, selectedImg]);
    }
  };
  return (
    <div className="w-full ml-auto mb-[1.5rem]">
      <p className="text-[16px] font-bold">Upload images of your item</p>
      <p className="text-[12px] mb-[1.5rem]">The more the better.</p>
      <div className="grid grid-cols-4 gap-3 w-full">
        <label htmlFor="dropzone-file" className="file-drop">
          <div className="flex flex-col justify-center items-center pt-5 pb-6 text-gray-400">
            <MdFileUpload size={30} />
            <p className="mb-2 text-[12px]">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={props.handleInputChange}
          />
        </label>
      </div>
    </div>
  );
}

export default ImageDroper;
