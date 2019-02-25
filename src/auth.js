//import auth0 from 'auth0-js';

class Authentication {
  constructor() {
    // this.auth0 = new auth0.WebAuth({
    //   // the following three lines MUST be updated
    //   domain: '<AUTH0_DOMAIN>',
    //   audience: 'https://<AUTH0_DOMAIN>/userinfo',
    //   clientID: '<AUTH0_CLIENT_ID>',
    //   redirectUri: 'http://localhost:3000/callback',
    //   responseType: 'token id_token',
    //   scope: 'openid profile'
    // });

    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  getProfile() {
    return this.profile;
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
    //   this.auth0.parseHash((err, authResult) => {
    //     if (err) return reject(err);
    //     console.log(authResult);
    //     if (!authResult || !authResult.idToken) {
    //       return reject(err);
    //     }
    //     this.setSession(authResult);
    //     resolve();
    //   });
    })
  }

  isAuthenticated() {
    console.log('isAuthenticated', new Date().getTime() < this.expiresAt, this)
    return new Date().getTime() < this.expiresAt;
  }

  login() {
    // this.auth0.authorize();
  }

  logout() {
    // clear id token and expiration
    this.idToken = null;
    this.expiresAt = null;
  }

  setSession(authResult) {
    // {accessToken: "4hmp2yjt2gumngzdofv6qki5dl6d43", display_name: "captain_ak47", login: "captain_ak47"}
    console.log('setSession', authResult)
    if(authResult) {
      this.accessToken = authResult.accessToken;
      this.dispaly_name = authResult.display_name;
      this.login = authResult.login;
      // set the time that the id token will expire at
      if(!authResult.expiresIn) {
        authResult.expiresIn = 60*60*12;
      }
      this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
      console.log('updated auth', this)  
    }
  }
}

const auth = new Authentication();

export default auth;