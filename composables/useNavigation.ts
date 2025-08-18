export const useNavigation = () => {
  const isNavigationVisible = useState('navigation.visible', () => true)
  const isNavigationRail = useState('navigation.rail', () => false)

  const toggleNavigation = () => {
    isNavigationVisible.value = !isNavigationVisible.value
  }

  const toggleNavigationRail = () => {
    if (isNavigationVisible.value) {
      isNavigationRail.value = !isNavigationRail.value
    }
  }

  const showNavigation = () => {
    isNavigationVisible.value = true
  }

  const hideNavigation = () => {
    isNavigationVisible.value = false
  }

  return {
    isNavigationVisible: readonly(isNavigationVisible),
    isNavigationRail: readonly(isNavigationRail),
    toggleNavigation,
    toggleNavigationRail,
    showNavigation,
    hideNavigation
  }
}
