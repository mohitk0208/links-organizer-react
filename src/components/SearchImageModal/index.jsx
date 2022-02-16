import { useState } from "react";
import useDebounceTimeout from "../../hooks/useDebounceTimeout";
import endpoints from "../../utils/endpoints";
import { fetchWrapper } from "../../utils/fetchWrapper";
import Button from "../utilComponents/Button";

import Modal from "../utilComponents/Modal";

function SearchImageModal({ isOpen, onClose, onSubmit }) {

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
          setImages(resData.results);
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


  const imageSelectHandler = (image) => {
    setSelectedImage(image.preview);
  }


  return (
    <Modal
      show={isOpen}
      onCancel={onClose}
      headline="Search for Images"
      onSubmit={() => null}
      size="2xl"
      className="min-h-[500px] border-t pt-2 flex flex-col gap-2"
    >

      <div className="flex justify-between gap-2 px-2 text-center" >
        <input
          className="w-full p-1 px-2 border-b-2 focus:outline-none text-center"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images"
        />

        <div >
          <Button type="button" disabled={!selectedImage} onClick={() => {
            onSubmit(selectedImage)
            onClose()
          }}>
            Done
          </Button>
        </div>

      </div>


      <div className="grid grid-cols-3 gap-1 flex-1 max-h-96 overflow-auto" >
        {isLoading ? (
          Array(9).fill(0).map((_, i) => (
            <div className="w-full h-full aspect-[2/1.5] bg-gray-300 animate-pulse" />
          ))
        ) : (

          images.map((image) => (
            <div className={`w-full h-full aspect-[2/1.5] shadow cursor-pointer overflow-hidden ${selectedImage === image.preview && "border-4 border-fuchsia-500"} `} onClick={() => imageSelectHandler(image)} key={image.preview} >
              <img src={image.preview} alt={image.name} className=" w-full h-full object-cover hover:scale-110 transition-transform ease-in-out duration-200" />
            </div>
          ))
        )}
      </div>


    </Modal>
  )
}

export default SearchImageModal
