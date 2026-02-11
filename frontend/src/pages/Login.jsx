function Login() {
  return (
    <div style={{ padding: "30px" }}>

      <h1>Login Page</h1>

      <form style={{ maxWidth: "300px" }}>

        <input type="email" placeholder="Email" style={inputStyle} />
        <input type="password" placeholder="Password"style={inputStyle}/>
        <button style={btnStyle}>Login</button>
      </form>

    </div>
  )
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px"
}

const btnStyle = {
  width: "100%",
  padding: "8px",
  background: "#38bdf8",
  border: "none",
  fontWeight: "bold"
}

export default Login;
