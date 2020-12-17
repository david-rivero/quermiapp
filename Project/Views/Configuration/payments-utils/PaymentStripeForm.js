import ConfigProvider from '../../../Providers/ConfigProvider';

const config = ConfigProvider();

const htmlStripeStyles = `
  .StripeElement {
    box-sizing: border-box;

    height: 40px;

    padding: 10px 12px;

    border: 1px solid transparent;
    border-radius: 4px;
    background-color: white;

    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  .btn-container {
    display: flex;
    justify-content: space-around;
  }

  .stripe-btn, .cancel-btn {
    border: 0;
    border-radius: 3px;
    color: white;
    display: block;
    font-size: 10px;
    font-weight: bold;
    margin: 2rem auto;
    padding: 0.75rem;
    text-transform: uppercase;
  }

  .stripe-btn {
    background-color: #32325d;
  }

  .cancel-btn {
    background-color: #980131;
  }
`;

const htmlStripeJS = `(function () {
  const stripe = Stripe('${config.stripeAPIKey}');

  const elements = stripe.elements();
  const cardElement = elements.create('card');
  const cardForm = document.getElementById('payment-form');
  cardElement.mount('#card-element');

  cardForm.addEventListener('submit', ev => {
    ev.preventDefault();
    saveCardInfo();
  });
  
  function saveCardInfo () {
    const paymentMethod = {
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'XXXXX',
      },
    };
    stripe.createPaymentMethod(paymentMethod).then(async (result) => {
      console.log(result);
      if (result.error) {
        // Display error.message in your UI
        let errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // You have successfully created a new PaymentMethod
        /*
          {
            paymentMethod: {
              billing_details: {...},
              card: {...},
              id: '...',
              object: 'payment_method',
              type: 'card'
            }
          }
        */
        window.ReactNativeWebView.postMessage(JSON.stringify({
          paymentId: result.paymentMethod.id,
          cardInfo: result.paymentMethod.card,
          fullData: result
        }));
      }
    });
  }
})();`;

export const htmlStripeForm = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1;" />
      <style>${htmlStripeStyles}</style>
    </head>
    <body>
      <form id="payment-form">
        <div class="form-row">
          <div id="card-element">
            <!-- A Stripe Element will be inserted here. -->
          </div>

            <!-- Used to display form errors. -->
          <div id="card-errors" role="alert"></div>
        </div>
        
        <div class="btn-container">
          <button type="submit" class="stripe-btn">Submit Payment</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </form>
      <script src="https://js.stripe.com/v3"></script>
      <script>${htmlStripeJS}</script>
    </body>
  </html>
`;
