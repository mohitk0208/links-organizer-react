/**
 *
 * @param {string} url endpoint
 * @param {boolean} isPrivate true if api requires token default is false
 */
function get(url, isPrivate = false) {
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
function post(url, body, isPrivate = false) {
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
function put(url, body, isPrivate = false) {

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
 function patch(url, body, isPrivate = false) {

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
function _delete(url, isPrivate = false) {

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
function setHeaders(isPrivate) {

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