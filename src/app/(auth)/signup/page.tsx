import { handleSignUp } from "./actions";

export default function SignUpPage() {
  return (
    <div className="auth-container">
      <h1>Create Account</h1>
      <form action={handleSignUp} className="flex flex-col gap-4">
        <input name="name" type="text" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Log in</a></p>
    </div>
  );
}