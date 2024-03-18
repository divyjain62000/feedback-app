export const isKeyInLocalStorage = (key: string) => {
    return key in localStorage;
  };
  
  export const cleanLocalStorage = () => {
    localStorage.removeItem("loginInfo");
  };
  
  export const setLoginInfo = (loginData: any) => {
    const loginInfo = {
      access_token: loginData.token,
      user_data: loginData.userData
    };
    localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
  };
  
  export const getLoginInfo = () => {
    const loginInfo: string | null = localStorage.getItem("loginInfo");
    let loginInfoData = null;
    if (loginInfo !== null) {
      loginInfoData = JSON.parse(loginInfo);
    }
    return loginInfoData;
  };
  
  export const getAccessToken = () => {
    const loginInfo = getLoginInfo();
    if (loginInfo !== null) {
      return "Bearer " + loginInfo.access_token;
    }
    return "Bearer ";
  };
  