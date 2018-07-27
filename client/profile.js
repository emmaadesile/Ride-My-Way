const profileName = document.querySelector(".profile-name");
const userToken = sessionStorage.getItem("token");

function decodeToken(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

const userInfo = decodeToken(token);
const userId = userInfo.userId.user_id;
const firstname = userInfo.userId.firstname;
const lastname = userId.user_id.lastname;
const fullname = `${firstname} ${lastname}`;

(function (){
  profileName.innerHTML = fullname;
})();