export const getTabBarKey = (location: any) => {
  if (location.pathname.includes('personal')) {
    return 'personal';
  } else if (location.pathname.includes('scan')) {
    return 'scan';
  } else if (location.pathname.includes('verify')) {
    return 'verify';
  }
  return 'home';
}