export const useUpperCase = () => {
  return (value: string): string => {
    return value?.toUpperCase() ?? ''
  }
}
