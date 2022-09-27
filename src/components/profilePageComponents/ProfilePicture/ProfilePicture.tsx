import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectIsEditMode } from '../../../slices/userSlice'
import { PencilIcon } from "@heroicons/react/24/solid"
import Modal from '../../utilComponents/Modal'
import { Transition } from '@headlessui/react'

const sprites = [
  "avataaars",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "croodles",
  "croodles-neutral",
  "gridy",
  "identicon",
  "initials",
  "jdenticon",
  "micah",
  "miniavs",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral"
] as const

function getSeed(imgUrl: string) {
  return imgUrl.match(/\/(?<seed>[^/]*)\.svg/)?.groups?.seed
}

function getSprite(imgUrl: string) {
  return imgUrl.match(/\/(?<sprite>[^/]*)\/[^/]*\.svg/)?.groups?.sprite
}

interface ProfilePictureProps {
  avatar: string,
  setAvatar: (avatar: string) => void
}

function ProfilePicture({ avatar, setAvatar }: ProfilePictureProps) {
  const isEditMode = useSelector(selectIsEditMode)
  const [isOpen, setIsOpen] = useState(false)
  const [dicebearSeed, setDicebearSeed] = useState(getSeed(avatar) || "")
  const [dicebearSprite, setDicebearSprite] = useState(getSprite(avatar) || sprites[0])
  const [previewOpen, setPreviewOpen] = useState(false)

  const generatedAvatar = `https://avatars.dicebear.com/api/${dicebearSprite}/${dicebearSeed}.svg`;

  return (
    <>
      <div className="relative w-40 h-40 shadow-inner rounded-full flex items-end justify-center hover:shadow-lg" >

        <img className="w-11/12 rounded-full cursor-pointer" src={avatar} alt="profile avatar" onClick={() => {
          if (!isEditMode) setPreviewOpen(true)
        }} />

        {isEditMode && (
          <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/70 opacity-0 hover:opacity-75 cursor-pointer transition-opacity duration-150 ease-in-out" onClick={() => setIsOpen(true)} >
            <PencilIcon className="w-8 h-8 text-white" />
          </div>
        )}

        <Transition
          as="div"
          static
          show={previewOpen}
          className="fixed inset-0 z-30"
        >
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-black/80 cursor-pointer" onClick={() => setPreviewOpen(false)} ></div>
          </Transition.Child>

          {/* preview image */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-8 scale-75 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-10 sm-translate-y-0 sm:scale-95"
          >
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              <img className="w-full h-full" src={avatar} alt="profile avatar" />
            </div>
          </Transition.Child>



        </Transition>

      </div>
      <Modal
        className=""
        show={isOpen}
        headline="Change Profile Picture"
        btn="Change"
        cancelBtn="Cancel"
        onSubmit={() => {
          setIsOpen(false)
          setAvatar(generatedAvatar)
        }}
        onCancel={() => {
          setIsOpen(false)
          setDicebearSeed(getSeed(avatar) || "")
          setDicebearSprite(getSprite(avatar) || sprites[0])

        }}

      >
        <div className="w-full h-20 rounded-md py-2 flex items-center justify-center" >
          <img className="h-full block " src={generatedAvatar} alt="profile" />
        </div>

        <div className="flex px-2 rounded-md my-3" >

          <select className="rounded-l-md flex-[1] w-full" value={dicebearSprite} onChange={(e) => setDicebearSprite(`${e.target.value}`)} >
            {sprites.map(sprite => {

              return (<option key={sprite} className="" value={sprite} >{sprite}</option>)

            })}
          </select>

          <input className="rounded-r-md flex-[3] w-full " type="text" placeholder="SEED" value={dicebearSeed} onChange={(e) => setDicebearSeed(`${e.target.value}`)} />
        </div>


      </Modal>
    </>




  )
}

export default ProfilePicture
