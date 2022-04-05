import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import Button from '../Button'
import { XIcon } from '@heroicons/react/solid'

const MODAL_WIDTH = {
  "sm": "max-w-md",
  "md": "max-w-lg",
  "lg": "max-w-xl",
  "xl": "max-w-2xl",
  "2xl": "max-w-3xl"
} as const

interface ModalProps {
  show: boolean,
  onCancel: () => void,
  children: React.ReactNode
  headline: string,
  btn?: string | React.ReactNode,
  onSubmit: () => void,
  cancelBtn?: string | React.ReactNode,
  className: string,
  size: keyof typeof MODAL_WIDTH,
}

function Modal({ className = "", size = "md", ...props }: ModalProps) {

  return (
    <Transition show={props.show} as={Fragment} >
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={props.show}
        onClose={props.onCancel}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 -translate-y-8 scale-75 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 -translate-y-8 sm-translate-y-0 sm:scale-95"
          >
            <div className={`inline-block w-full ${MODAL_WIDTH[size]} p-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg`}>
              <div>
                <Dialog.Title as="h3" className="text-lg leading-3 font-medium py-2 text-gray-900 flex justify-between items-center">
                  <span>
                    {props.headline}
                  </span>
                  <XIcon className='w-7 h-7 opacity-70 hover:opacity-100 cursor-pointer transition-colors ease-in-out duration-200' onClick={() => props.onCancel()} />
                </Dialog.Title>

                <div className={className}>
                  {props.children}
                </div>
              </div>

              {(props.btn || props.cancelBtn) && (
                <div className="flex py-2 items-center justify-end gap-3">

                  {props.cancelBtn && (
                    typeof (props.cancelBtn) === "string" ? (
                      <Button className="my-1 " variant="outline-danger" type="button" onClick={props.onCancel} >{props.cancelBtn}</Button>
                    ) : props.cancelBtn
                  )}

                  {props.btn && (
                    typeof (props.btn) === "string" ? (
                      <Button className="my-1" variant="success" type="button" onClick={props.onSubmit}  >{props.btn}</Button>
                    ) : props.btn

                  )}

                </div>
              )}
            </div>
          </Transition.Child>

        </div>


      </Dialog>
    </Transition>
  )
}

export default Modal
