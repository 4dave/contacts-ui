import React from "react"
import { GoogleLogout } from "react-google-login"

const clientId =
  "357826594611-4ncsu6vnbiceh89rbbct5i56nmihqq21.apps.googleusercontent.com"

function Logout() {
  const onSuccess = () => {
    console.log("Logout made successfully")
    alert("Logout made successfully ✌")
  }

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  )
}

export default Logout