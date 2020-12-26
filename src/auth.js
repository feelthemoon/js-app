export const getAuthForm = () => {
  return `
    <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
              <input
                type="email"
                id="email"
                required
              />
              <label for="question-input">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input
                type="password"
                id="password"
                required
              />
              <label for="question-input">Password</label>
            </div>
            <button
              type="submit"
              class="mui-btn mui-btn--raised mui-btn--primary"
            >
              Log In
            </button>
          </form>
    `;
};

export const authWithEmailAndPassword = async (userData) => {
  const API_KEY = "AIzaSyDwY95Zf6KipPENxOwTKJ2A20wdyedtCsU";
  const response = (
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({ ...userData, returnSecureToken: true }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  ).json();
  return (await response).idToken;
};
