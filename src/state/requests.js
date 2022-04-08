import axios from 'axios'

export const get = (url, state, params) => {
  return axios.get(url, {
    auth: {
      username: state.user.username,
      password: state.user.password
    },
    ...params
  })
}

export const post = (url, body, state, params) => {
  return axios.post(url, body, {
    auth: {
      username: state.user.username,
      password: state.user.password
    },
    ...params
  })
}

export const put = (url, body, state, params) => {
  return axios.put(url, body, {
    auth: {
      username: state.user.username,
      password: state.user.password
    },
    ...params
  })
}

export const genericError = (error, dispatch, type) => {
  console.log(error, error.response)
  dispatch({
    type,
    payload: {
      status: error?.response?.status,
      message: 'Something went wrong...'
    }
  })
}

export const notAuthenticated = () => {}
