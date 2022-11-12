import React, { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

interface ImageDroperProperties {
  inputValue: React.RefObject<HTMLInputElement>;
  images: Array<File | undefined>;
  setImages: React.Dispatch<React.SetStateAction<(File | undefined)[]>>;
}

function ImageDroper(props: ImageDroperProperties) {
  const [images, setImages] = useState<Array<FileList | null>>([]);

  return (
    <div className="w-full ml-auto mb-[1.5rem]">
      <p className="text-[16px] font-bold">Upload images of your item</p>
      <p className="text-[12px] mb-[1.5rem]">The more the better.</p>
      <div className="grid grid-cols-4 gap-3 w-full">
        {images.map((image, key) => {
          if (image) {
            const src = URL.createObjectURL(image[0]);
            const indexOfImage = images
              .map((image, key) => {
                if (image) return image[0].name;
              })
              .indexOf(image[0].name);

            console.log(indexOfImage);
            return (
              <div className="flex flex-col items-end group">
                <div className="absolute p-3">
                  <FaTrash
                    className="hover:text-red-600 scale-0 group-hover:scale-100"
                    onClick={() => {
                      images.splice(indexOfImage, 1);
                    }}
                    size={20}
                  />
                </div>
                <img
                  key={key}
                  className=" w-44 h-44 object-cover border border-black"
                  src={src}
                  alt=""
                />
              </div>
            );
          }
        })}

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
            accept="image/*"
            ref={props.inputValue}
            onChange={() => {
              if (props.inputValue.current) {
                console.log(props.inputValue.current.files);
              }
            }}
            multiple
          />
        </label>
      </div>
    </div>
  );
}

export default ImageDroper;
