/* subscription.js – MemoryCapsule */

// ✅ Free plan: save plan and send user back to landing page
function chooseFree() {
  localStorage.setItem('plan', 'free');
  window.location.href = 'landing.html';
}

// ✅ Paid plans: pass plan name & price to payment page via URL params
function goToPayment(planName, price) {
  localStorage.setItem('selectedPlan', planName);
  localStorage.setItem('selectedPrice', price);
  window.location.href = 'payment.html?plan=' + planName + '&price=' + price;
}

// Logout: clear session and return to login
function logout() {
  localStorage.removeItem('plan');
  localStorage.removeItem('selectedPlan');
  localStorage.removeItem('selectedPrice');
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  window.location.href = 'login.html';
}