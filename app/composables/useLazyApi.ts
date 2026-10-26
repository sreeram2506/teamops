export const useLazyApi = <T>(url: string | (() => string)) => {
  return useFetch<T>(url, {
    lazy: true,
    server: false,
    getCachedData: () => undefined
  })
}
