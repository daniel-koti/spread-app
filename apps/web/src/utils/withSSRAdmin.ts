import { AuthTokenError } from '@/services/errors/AuthTokenError'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'

export function withSSRAdmin<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['@spread.token.admin']) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@spread.token.admin')
        destroyCookie(ctx, 'refreshToken')

        return {
          redirect: {
            destination: '/signin',
            permanent: false,
          },
        }
      }
    }
  }
}
