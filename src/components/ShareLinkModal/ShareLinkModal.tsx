import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import useTimeout from "../../hooks/useTimeout"
import Modal from "../utilComponents/Modal"
import { SocialIcon } from "react-social-icons"

type ShareLinkModalProps = {
  show: boolean,
  url: string,
  onClose: () => void
}

type socialLinkType = {
  networkIcon: string,
  getUrl: (url: string) => string
}

const socialLinkIcons: socialLinkType[] = [
  {
    networkIcon: "telegram",
    getUrl: (url: string) => `https://telegram.me/share/?url=${url}`
  },
  {
    networkIcon: "whatsapp",
    getUrl: (url: string) => `https://web.whatsapp.com/send?text=${url}`
  },
  {
    networkIcon: "twitter",
    getUrl: (url: string) => `https://twitter.com/share?url=${url}`
  },
  {
    networkIcon: "reddit",
    getUrl(url) {
      return `https://www.reddit.com/submit?url=${url}`
    },
  }
]


export default function ShareLinkModal({ show, url, onClose }: ShareLinkModalProps) {

  const [isUrlCopied, setIsUrlCopied] = useState(false)
  const [currentText, setCurrentText] = useState(url)
  const { reset, clear } = useTimeout(() => {
    setIsUrlCopied(false)
  }, 30000)
  const inputRef = useRef<HTMLInputElement>(null)


  function copyUrlToClipboard() {
    navigator.clipboard.writeText(currentText)
    inputRef.current?.select()

    setIsUrlCopied(true)
  }

  useEffect(() => {
    if (isUrlCopied) {
      reset()
    }

    return () => clear()

  }, [isUrlCopied, reset, clear])

  useEffect(() => {
    setIsUrlCopied(false)
  }, [currentText])

  useEffect(() => {
    setCurrentText(url)

  }, [show, url])


  return (
    <Modal
      show={show}
      onCancel={onClose}
      onSubmit={() => null}
      headline="Share Link"
    >
      <div className="border flex items-center rounded-md my-3">
        <input ref={inputRef} value={currentText} onChange={(e) => setCurrentText(e.target.value)} className="border flex-1 p-2 outline-none" spellCheck={false} />
        <button type="button" className="border p-2" onClick={copyUrlToClipboard} >
          {
            isUrlCopied ? (
              <CheckIcon className="h-6 w-6 text-green-500" />
            ) : (
              <ClipboardDocumentIcon className="h-6 w-6 text-gray-600" />
            )
          }
        </button>
      </div>
      <div className="flex gap-2 items-center justify-center py-2" >
        {socialLinkIcons.map(socialLink => {

          const { networkIcon, getUrl } = socialLink

          return (
            <div className="rounded-full p-3 bg-purple-600/10 hover:bg-purple-600/40 transition-colors duration-200 ease-in-out focus-within:bg-purple-600/40" key={networkIcon} >
              <SocialIcon
                className="outline-none "
                url={getUrl(currentText)}
                target="_blank"
                rel="noreferrer"
                network={networkIcon}
                style={{
                  height: "2.5rem",
                  width: "2.5rem"
                }}
                fgColor="white"
              />
            </div>
          )
        })}
      </div>

    </Modal>
  )

}