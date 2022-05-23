const initAuth = () => {
  let temp = "508586139049-7cbhguq576ffpeoi5ohpt1gqvohhdt5f.apps.googleusercontent.com";
    return window.gapi.auth2.init({
      client_id: temp, //paste your client ID here
      scope: "https://www.googleapis.com/auth/analytics.readonly",
      plugin_name: 'streamy'
    });
  };

  export const checkSignedIn = () => {
    return new Promise((resolve, reject) => {
      initAuth() //calls the previous function
        .then(() => {
        console.log("reaching");
          const auth = window.gapi.auth2.getAuthInstance(); //returns the GoogleAuth object
          resolve(auth.isSignedIn.get()); //returns whether the current user is currently signed in
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  export const renderButton = () => {
    window.gapi.signin2.render("signin-button", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: onSuccess,
      onfailure: onFailure,
    });
  };
  
  const onSuccess = (googleUser) => {
    console.log("Logged in as: " + googleUser.getBasicProfile().getName());
  };
  
  const onFailure = (error) => {
    console.error(error);
  };