const serverURL = 'http://localhost:4200/'
const pageGenerateURL = 'api/pagegenerate';
const exsitedPageURL = 'pages';

const loginURL = 'https://vmw16apxcloud01.gencos.com/apxlogin/api/internal/authenticate?login';
const userName = 'admin';
const password = 'advs'
const sessionKey = "ApxApp$sessionCode";


//Generate one or more page, pages is an array.
function generatePages(pages, callbackFN) {
    let url = serverURL + pageGenerateURL;
    let callback = function (data, status) {
        if (callbackFN) {
            callbackFN(data);
        }
        console.log("generatePages returned Data: " + data + "\nStatus: " + status);
    };

    $.post(url, pages, callback);
    console.log('generatePages call complete......');
}

//Get the existed pages(includes state, whether or not generated) which will be listed in UI.
function getExsitedPages(callbackFN) {
    let url = serverURL + exsitedPageURL;
    let callback = function (data, status) {
        if (callbackFN) {
            callbackFN(data);
        }
        console.log("getExsitedPages returned Data: " + data + "\nStatus: " + status);
    };

    $.get(url, callback);
    console.log('getExsitedPages call complete......');
}


//for UI user login
function login() {
    let url = loginURL + exsitedPageURL;
    let authValue = (userName == null && password == null) ? null : "Basic " + btoa(userName + ":" + password);
    let requestOptionsArgs = null;

    if (authValue != null) {
        let headers = new Headers();
        headers.set("ApxLogin", authValue);
        requestOptionsArgs = {
            headers: headers
        };
    }

    let callback = function (data, status) {
        let res = data.json();
        if (res.StatusCode <= 1) {
            window.localStorage.setItem(sessionKey, res.SessionCode);
        }
        console.log("Login returned Data: " + data + "\nStatus: " + status);
    };

    $.get(url, requestOptionsArgs, callback);
    console.log('Call login complete......');

}