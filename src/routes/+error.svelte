<script>
  import star from '$lib/assets/star-top-left.svg';
  import spring from '$lib/assets/tilted-spring-below-left.svg';
  import amoeba from '$lib/assets/amoeba-below-right.svg';
</script>

<style>
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    background-color: #000; /* Changed to black */
    color: #fff; /* Changed to white for contrast */
    position: relative;
    overflow: hidden;
  }
  .error-code {
    font-size: 6rem;
    font-weight: bold;
    text-shadow: 3px 3px 2px purple; /* Added purple text shadow */
    animation: pulse 2s infinite;
  }
  .error-message {
    font-size: 1.5rem;
    animation: fadeIn 3s ease-in-out;
  }
  .home-link {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #007bff;
    text-decoration: none;
    animation: bounce 2s infinite;
  }
  .home-link:hover {
    text-decoration: underline;
  }
  .asset {
    position: absolute;
    animation: float 6s ease-in-out infinite;
  }
  .top-left {
    top: 10px;
    left: 10px;
  }
  .bottom-left {
    bottom: 10px;
    left: 10px;
  }
  .bottom-right {
    bottom: 10px;
    right: 10px;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
  }
</style>

<div class="error-container">
  <img src={star} alt="Star" class="asset top-left" />
  <img src={spring} alt="Spring" class="asset bottom-left" />
  <img src={amoeba} alt="Amoeba" class="asset bottom-right" />
  <div class="error-code">404</div>
  <div class="error-message">Oops! The page you're looking for doesn't exist.</div>
  <a class="home-link" href="/">Go back to Home</a>
</div>
