import { useState } from "react";
import useDebounceTimeout from "../../hooks/useDebounceTimeout";
import endpoints from "../../utils/endpoints";
import { fetchWrapper } from "../../utils/fetchWrapper";

import Modal from "../utilComponents/Modal";

function SearchImageModal({ isOpen, onClose, setFieldValue }) {

  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useDebounceTimeout(() => {

    async function getResults() {

      setIsLoading(true)

      try {
        const res = await fetchWrapper.get(endpoints.GET_IMAGES(query));

        if (res.status === 200) {
          const resData = await res.json();
          setImages(resData.result);
        }

      }
      catch (error) {
        console.log(error);
      }
      finally {
        setIsLoading(false)
      }

    }

    getResults();

  }, 1000, [query]);



  return (
    <Modal
      show={isOpen}
      onCancel={onClose}
      headline="Search for Images"
      onSubmit={() => null}
      size="2xl"
      className="min-h-[500px] border-t pt-2 flex flex-col gap-2"
    >

      <div className="flex justify-center text-center" >
        <input
          className="w-full max-w-md p-1 px-2 border-b-2 focus:outline-none text-center"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images"
        />
      </div>


      <div className="grid grid-cols-3 gap-1 flex-1 max-h-96 overflow-auto" >
        {isLoading ? (
          Array(9).fill(0).map((_, i) => (
            <div className="w-full h-full aspect-[2/1.5] bg-gray-300 animate-pulse" />
          ))
        ) : (

          images.map((image) => (
            <div className="w-full h-full aspect-[2/1.5] shadow cursor-pointer overflow-hidden" >
              <img src={image.preview} alt={image.name} className=" w-full h-full object-cover hover:scale-110 transition-transform ease-in-out duration-200" />
            </div>
          ))
        )}
      </div>


    </Modal>
  )
}

export default SearchImageModal
