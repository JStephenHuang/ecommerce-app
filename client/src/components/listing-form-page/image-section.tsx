import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

interface ImageDroperProperties {
  handleImageChange: (images: File[]) => void;
}

const ImageDroper = (props: ImageDroperProperties) => {
  const [images, setImages] = useState<File[]>([]);

  const uploadImgHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImg = [...images];

    if (event.target.files) {
      newImg.push(event.target.files[0]);
    }

    setImages(newImg);

    props.handleImageChange(newImg);
  };

  const deleteImgHandler = (file: File) => {
    const selectedImgIndex = images.indexOf(file);
    const newImg = [...images];
    console.log(selectedImgIndex);
    newImg.splice(selectedImgIndex, 1);
    setImages(newImg);
  };

  return (
    <div className="w-full ml-auto mb-[1.5rem]">
      <p className="text-[16px] font-bold">Upload images of your item</p>
      <p className="text-[12px] mb-[1.5rem] font-light">The more the better.</p>
      <div className="grid grid-cols-3 gap-3 w-full">
        {images.map((file, key) => {
          return (
            <div
              key={key}
              className="w-64 aspect-square group border bg-black border-black"
            >
              <IoClose
                onClick={() => deleteImgHandler(file)}
                className="hover:text-red-600 absolute scale-0 m-3 text-white group-hover:scale-100"
                size={32}
              />

              <img
                className="w-full h-full "
                src={URL.createObjectURL(file)}
                alt=""
              />
            </div>
          );
        })}
        <label htmlFor="dropzone-file" className="file-drop">
          <div className="flex flex-col justify-center items-center text-gray-400">
            <p className="mb-2 text-[12px] font-light">
              <span className="font-bold">Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id="dropzone-file"
            name="imageURL"
            type="file"
            className="hidden"
            onChange={uploadImgHandler}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageDroper;
