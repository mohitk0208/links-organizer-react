import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  current: null,
  queue: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setCurrentMessage: (state, action) => {
      state.current = action.payload
    },

    /**
     *
     * @param {*} state
     * @param {{payload:{msg:string,type:"success"|"error"|"warning",duration:number}}} action
     */
    enqueueNotification: (state, action) => {
      if (state.current === null) {
        state.current = action.payload
      }
      else {
        state.queue.push(action.payload)
      }
    },

    dequeueNotification: (state, action) => {
      if (state.queue.length === 0) {
        state.current = null
      } else {
        state.current = state.queue.shift()
      }

    },

    clearNotificationQueue: (state, action) => {
      state.queue = []
    }

  }
})

export const { setCurrentMessage, enqueueNotification, dequeueNotification, clearNotificationQueue } = notificationSlice.actions


// export const selectCurrentMessage = state => state.notification.current.msg
// export const selectCurrentDuration = state => state.notification.current.duration
// export const selectCurrentAlertVariant = state => state.notification.current.type
export const selectCurrentObject = state => state.notification.current

export default notificationSlice.reducer