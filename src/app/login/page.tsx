export default function Login() {
  return (
    <form action="/api/auth/signup" method="post">
      <label>Email</label>
      <input type="text" name="email" />
      <label>Password</label>
      <input type="password" name="password" />
      <button>Sign up</button>
    </form>
  );
}
