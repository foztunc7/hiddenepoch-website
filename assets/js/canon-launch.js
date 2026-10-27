/* Canon launch price. While the Stripe LAUNCH promo is live (50% off, expires Sat 10/31 8pm ET),
   every Canon checkout link on the page gets the code prefilled and every [data-canon-price]
   shows the struck-through full price next to the launch price, so a visitor from the launch
   emails sees the same offer they clicked. After the deadline it does nothing and the page
   falls back to its static $27.99 copy. */
(function () {
  var ENDS = 1793491199000; // Stripe promotion_code LAUNCH expires_at
  if (Date.now() >= ENDS) return;
  var LINK = 'https://buy.stripe.com/7sY28sf076NY26XgdyeZ200';

  document.querySelectorAll('a[href^="' + LINK + '"]').forEach(function (a) {
    a.href = LINK + '?prefilled_promo_code=LAUNCH';
  });
  document.querySelectorAll('[data-canon-price]').forEach(function (el) {
    el.innerHTML = '<s style="opacity:0.55;">$27.99</s> $13.99';
  });
  document.querySelectorAll('[data-canon-deadline]').forEach(function (el) {
    el.hidden = false;
  });
})();
