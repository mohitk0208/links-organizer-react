import React, { useState } from 'react'
import Tag from '../utilComponents/Tag'
import { ShareIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import DeleteConfirmModal from '../DeleteConfirmModal'
import { deleteLinkAsync } from '../../slices/linksSlice'
import { Link } from 'react-router-dom'
import { routes } from '../../utils/routeStrings'
import { LinkType } from '../../types/linksSliceType'
import { useAppDispatch } from '../../app/store'
import ShareLinkModal from '../ShareLinkModal'


interface LinkCardProps {
  link: LinkType,
  // handleBookmarkClick: (link: LinkType) => void,
}

function LinkCard({ link }: LinkCardProps) {

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const {
    id,
    url,
    description,
    category_background_url,
    // created_at,
    // updated_at,
    tags
  } = link


  return (
    <div className="p-2 pt-1 rounded-lg grid grid-cols-12 gap-1 drop-shadow-xl shadow-md border border-purple-500 " >

      {/* url */}
      <div className=" col-start-1 col-end-11 pl-2 mr-2 overflow-hidden" >
        <a href={url} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:text-blue-600 whitespace-nowrap overflow-hidden "  >{url}</a>
      </div>

      <div className="col-start-11 col-end-13 flex gap-2 text-center justify-around " >
        <Link
          to={routes.EDIT_LINK(id)}
          className="flex-1 cursor-pointer"
        >
          <PencilIcon className="w-4 h-4" />
        </Link>

        {/* <button
          className="block flex-1 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed rounded-full m-auto"
          onClick={() => handleBookmarkClick()}
        >
          <BookmarkIcon className={joinClassNames("w-4 h-4")} />
        </button> */}
        <button className="flex-1 cursor-pointer" onClick={() => setIsShareModalOpen(true)} >
          <ShareIcon className="w-4 h-4" />
        </button>
        <button className="flex-1 cursor-pointer" onClick={() => setIsDeleteModalOpen(true)} >
          <TrashIcon className="w-4 h-4 text-red-400 hover:text-red-700" />
        </button>
      </div>


      <div className="col-start-1 col-end-2 flex flex-col gap-3 justify-around text-center" >
        <img src={category_background_url} alt="" className="rounded h-full w-full object-cover" style={{ aspectRatio: "1" }} />
      </div>

      <div className="col-start-2 col-end-13 p-2 bg-purple-300/20 rounded h-16 " >
        <p className="text-sm text-purple-900" >
          {description}
        </p>
      </div>

      <div className="col-start-2 col-end-13 flex flex-wrap" >
        {tags.map((tag, index) => {
          return <Tag tag={tag} key={tag.id} />
        })}
      </div>


      <DeleteConfirmModal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        loading={loading}
        onDelete={async () => {
          setLoading(true)
          await dispatch(deleteLinkAsync(id))
          setIsDeleteModalOpen(false)
          setLoading(false)
        }}
        text={<>
          <span>Are you sure you want to delete </span>
          <span className="text-blue-400 text-sm ">{url}</span>
          <span> ?</span>
        </>}
      />

      <ShareLinkModal
        show={isShareModalOpen}
        url={url}
        onClose={() => setIsShareModalOpen(false)}
        m- />



    </div>
  )
}

export default LinkCard