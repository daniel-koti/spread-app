import { AuthTokenError } from '@/services/errors/AuthTokenError'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies['@spread.token']) {
      return {
        redirect: {
          destination: '/signin',
          permanent: false,
        },
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      console.log('RRRR', err)
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@spread.token')
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
