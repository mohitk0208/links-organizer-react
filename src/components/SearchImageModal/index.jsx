import { useEffect, useState } from "react";

import Modal from "../utilComponents/Modal";

function SearchImageModal({ isOpen, selectedImage, setSelectedImage, onClose, setFieldValue }) {

  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {

    // with debounce timeout set the images and when a image is selected highlight it
    // and close the modal

  }, [query])



  return (
    <Modal
      show={isOpen}
      onCancel={onClose}
      headline="Search for Images"
      onSubmit={() => null}
      size="2xl"
      className="min-h-[500px] border-t pt-2 "
    >

      <div className="flex justify-center text-center" >
        <input
          className="w-full max-w-md p-1 px-2 border-b-2 focus:outline-none text-center"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images"
        />
      </div>

      <div className="" >
        {images.map((image) => (
          <div>
            image
          </div>
        ))}
      </div>

    </Modal>
  )
}

export default SearchImageModal
