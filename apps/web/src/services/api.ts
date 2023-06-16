import axios, { AxiosError } from 'axios'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'
import Router from 'next/router'

interface AxiosErrorResponse {
  code?: string
}

let isRefreshing = false
let failedRequestsQueue: any[] = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${cookies['@spread.token']}`,
    },
  })

  /**
   * Interceptors
   */

  api.interceptors.response.use(
    (response) => {
      return response
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.code === 'token.expired') {
          cookies = parseCookies(ctx)

          const originalConfig = error.config

          if (!isRefreshing) {
            isRefreshing = true

            api
              .patch('/token/refresh')
              .then((response) => {
                const { token } = response.data

                setCookie(ctx, '@spread.token', token, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days
                  path: '/',
                })

                api.defaults.headers.Authorization = `Bearer ${token}`

                failedRequestsQueue.forEach((request) =>
                  request.onSuccess(token),
                )
                failedRequestsQueue = []
              })
              .catch((err) => {
                failedRequestsQueue.forEach((request) => request.onFailure(err))
                failedRequestsQueue = []

                if (typeof window !== 'undefined') {
                  destroyCookie(undefined, '@spread.token')
                  destroyCookie(undefined, 'refreshToken')
                  Router.push('/signin')
                }
              })
              .finally(() => {
                isRefreshing = false
              })
          }

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                originalConfig!.headers.Authorization = `Bearer ${token}`

                resolve(api(originalConfig!))
              },
              onFailure: (err: AxiosError) => {
                reject(err)
              },
            })
          })
        } else {
          if (typeof window !== 'undefined') {
            destroyCookie(undefined, '@spread.token')
            destroyCookie(undefined, 'refreshToken')
            Router.push('/signin')
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }
      }

      return Promise.reject(error)
    },
  )
  return api
}
