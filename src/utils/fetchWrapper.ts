/**
 *
 * @param {string} url endpoint
 * @param {boolean} isPrivate true if api requires token default is false
 */
function get(url: string, isPrivate = false) {
  const requestOptions = {
    method: 'GET',
    headers: setHeaders(isPrivate),
  }

  return fetch(url, requestOptions)
}




/**
 *
 * @param {string} url endpoint
 * @param {Object} body data to be sent
 * @param {boolean} isPrivate
 */
function post<T>(url: string, body: T, isPrivate = false) {
  const requestOptions = {
    method: 'POST',
    headers: setHeaders(isPrivate),
    body: JSON.stringify(body)
  }

  return fetch(url, requestOptions)
}




/**
 *
 * @param {string} url endpoint
 * @param {Object} body data to be sent
 * @param {boolean} isPrivate
 */
function put<T>(url: string, body: T, isPrivate = false) {

  const requestOptions = {
    method: 'PUT',
    headers: setHeaders(isPrivate),
    body: JSON.stringify(body)
  }

  return fetch(url, requestOptions)
}

/**
 *
 * @param {string} url endpoint
 * @param {Object} body data to be sent
 * @param {boolean} isPrivate
 */
function patch<T>(url: string, body: T, isPrivate = false) {

  const requestOptions = {
    method: 'PATCH',
    headers: setHeaders(isPrivate),
    body: JSON.stringify(body)
  }

  return fetch(url, requestOptions)
}


/**
 *
 * @param {string} url endpoint
 * @param {boolean} isPrivate
 * @returns
 */
function _delete(url: string, isPrivate = false) {

  const requestOptions = {
    method: 'DELETE',
    headers: setHeaders(isPrivate),
  }

  return fetch(url, requestOptions)

}



/**
 *
 * @param {boolean} isPrivate
 * @returns headers object
 */
function setHeaders(isPrivate: boolean) {

  const HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json",
  }


  if (isPrivate) {

    const accessToken = localStorage.getItem('access_token')

    if (typeof accessToken !== "undefined" && accessToken !== null)
      return {
        ...HEADERS,
        "Authorization": `Bearer ${accessToken}`
      }
  }

  return HEADERS
}




export const fetchWrapper = {
  get,
  post,
  put,
  patch,
  _delete
}