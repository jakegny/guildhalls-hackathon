import axios from "axios";
import jwt_decode from "jwt-decode";
import * as types from "./types";

const REACT_APP_CRYPTO_BOT_API =
  process.env.NODE_ENV === "production"
    ? "https://rtm-main.herokuapp.com"
    : "http://localhost:5001";

export const logout = () => {
  return {
    type: types.LOGOUT,
    payload: {},
  };
};

export const clearQRCode = () => {
  return {
    type: types.CLEAR_QR_CODE,
    payload: {},
  };
};

export const login =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    dispatch({
      type: types.LOGIN_FETCH,
    });
    return axios
      .post(`${REACT_APP_CRYPTO_BOT_API}/api/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log("res", res);

        // TODO: handle first time TFA set up
        const token = res.data.tfa_token;
        const decoded = jwt_decode(token);
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: {
            tfa_token: res.data.tfa_token,
          },
        });

        if (decoded?.is_tfa_enabled) {
          navigate("/authenticate");
        } else {
          navigate("/setupTFA");
        }
      })
      .catch((e) => {
        if (e?.response?.status === 401) {
          dispatch({
            type: types.LOGIN_FAILURE,
            payload: {
              status: e.response.status,
              message: "Incorrect username or password.",
            },
          });
        } else {
          console.log(e, e.response);
          dispatch({
            type: types.LOGIN_FAILURE,
            payload: {
              status: e?.response?.status,
              message: "Something went wrong...",
            },
          });
        }
      });
  };

export const register = (data, navigate) => async (dispatch) => {
  dispatch({
    type: types.REGISTER_FETCH,
    payload: {},
  });
  return axios
    .post(`${REACT_APP_CRYPTO_BOT_API}/api/auth/signup`, {
      username: data.username,
      password: data.password,
      email: data.email,
      name: data.name,
      // secret: data.secret,
      // TODO: more fields
    })
    .then((res) => {
      console.log("res", res);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: {
          ...res.data,
        },
      });
      navigate("/checkEmail");
    })
    .catch((e) => {
      if (e?.response?.status === 403 || e?.response?.status === 409) {
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: {
            status: e.response.status,
            message: e.response.data.message,
          },
        });
      } else {
        console.log(e, e.response);
        dispatch({
          type: types.REGISTER_FAILURE,
          payload: {
            status: e?.response?.status,
            message: "Something went wrong...",
          },
        });
      }
    });
};

export const authenticate =
  ({ tfaCode }, navigate) =>
  async (dispatch, getState) => {
    const state = getState();
    const tfa_token = state?.user?.tfa_token;
    return axios
      .post(
        `${REACT_APP_CRYPTO_BOT_API}/api/auth/2FA/authenticate`,
        {
          twoFactorAuthenticationCode: tfaCode,
        },
        {
          headers: {
            Authorization: `Bearer ${tfa_token}`,
          },
        }
      )
      .then((res) => {
        const token = res.data.token;
        const decoded = jwt_decode(token);
        dispatch({
          type: types.TFA_SUCCESS,
          payload: {
            token,
            ...decoded,
          },
        });
        navigate("/");
      })
      .catch((e) => {
        console.log(e, e.response);
        dispatch({
          type: types.TFA_FAILURE,
          payload: {
            status: e?.response?.status,
            message: "Invalid Code",
          },
        });
      });
  };

export const generateTFA = () => async (dispatch, getState) => {
  const state = getState();
  const tfa_token = state?.user?.tfa_token;
  return axios
    .post(
      `${REACT_APP_CRYPTO_BOT_API}/api/auth/2FA/generate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tfa_token}`,
        },
        responseType: "arraybuffer",
      }
    )
    .then((res) => {
      let blob = new Blob([res.data], {
        type: res.headers["content-type"],
      });
      dispatch({
        type: types.TFA_GENERATE_SUCCESS,
        payload: {
          qr_code: URL.createObjectURL(blob),
        },
      });
    })
    .catch((e) => {
      console.log(e, e.response);
      dispatch({
        type: types.TFA_GENERATE_FAILURE,
        payload: {
          status: e?.response?.status,
          message: "Something went wrong...",
        },
      });
    });
};

export const enableTFA = (tfaCode, navigate) => async (dispatch, getState) => {
  const state = getState();
  const tfa_token = state?.user?.tfa_token;
  return axios
    .post(
      `${REACT_APP_CRYPTO_BOT_API}/api/auth/2FA/enable`,
      {
        twoFactorAuthenticationCode: tfaCode,
      },
      {
        headers: {
          Authorization: `Bearer ${tfa_token}`,
        },
      }
    )
    .then((res) => {
      console.log("res", res);
      dispatch({
        type: types.TFA_ENABLE_SUCCESS,
        payload: {},
      });
      navigate("/successTFA");
    })
    .catch((e) => {
      console.log(e, e.response);
      dispatch({
        type: types.TFA_ENABLE_FAILURE,
        payload: {
          status: e?.response?.status,
          message: "Something went wrong...",
        },
      });
    });
};
