// Frontend JavaScript for login page
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const pwError = document.getElementById('pwError');
  const toggle = document.querySelector('.toggle-pw');

  // Toggle password visibility
  toggle.addEventListener('click', () => {
    const shown = password.type === 'text';
    password.type = shown ? 'password' : 'text';
    toggle.textContent = shown ? 'Show' : 'Hide';
    toggle.setAttribute('aria-pressed', String(!shown));
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let valid = true;
    emailError.textContent = '';
    pwError.textContent = '';

    // Basic validation
    if (!email.value.trim()) {
      emailError.textContent = 'Please enter your email or phone.';
      valid = false;
    }
    if (!password.value.trim() || password.value.length < 6) {
      pwError.textContent = 'Enter a password of at least 6 characters.';
      valid = false;
    }

    if (!valid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in...';

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token
        localStorage.setItem('token', data.token);
        // Redirect to homepage
        window.location.href = 'camio.html';
      } else {
        // Show error message
        pwError.textContent = data.message || 'Login failed. Please check your credentials.';
      }
    } catch (error) {
      console.error('Login error:', error);
      pwError.textContent = 'Connection error. Please try again.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign in';
    }
  });
});
