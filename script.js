// ==========================================
    // CHAI CULTURE - LANDING PAGE JAVASCRIPT
    // Full Sign In / Sign Out Functionality
    // ==========================================

    // Default configuration values
    const defaultConfig = {
      brand_name: 'Chai Culture',
      tagline: 'Brew the Royal Tradition',
      hero_description: 'Experience the authentic taste of premium Indian chai, crafted from recipes passed down through generations of royal households. Our instant chai premix brings the warmth and elegance of traditional chai to your cup.',
      launch_badge_text: 'Launching Soon',
      footer_text: '© 2024 Chai Culture. All rights reserved. | Crafted with ☕ and ❤️ in India'
    };

    // DOM Elements
    const emailInput = document.getElementById('email-input');
    const signupForm = document.getElementById('signup-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');
    const userInfo = document.getElementById('user-info');
    const userEmailDisplay = document.getElementById('user-email-display');
    const userAvatar = document.getElementById('user-avatar');
    const signoutBtn = document.getElementById('signout-btn');

    // ==========================================
    // UTILITY FUNCTIONS
    // ==========================================

    /**
     * Validates email format using regex
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    /**
     * Gets the first letter of email for avatar
     * @param {string} email - User email
     * @returns {string} - First letter uppercase
     */
    function getAvatarLetter(email) {
      return email.charAt(0).toUpperCase();
    }

    /**
     * Shows error message with animation
     * @param {string} message - Error message to display
     */
    function showError(message) {
      errorMessage.textContent = message;
      errorMessage.classList.add('show');
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        errorMessage.classList.remove('show');
      }, 3000);
    }

    /**
     * Clears error message
     */
    function clearError() {
      errorMessage.classList.remove('show');
      errorMessage.textContent = '';
    }

    // ==========================================
    // STORAGE FUNCTIONS (localStorage)
    // ==========================================

    /**
     * Saves user email to localStorage
     * @param {string} email - Email to save
     */
    function saveUser(email) {
      localStorage.setItem('chaiCultureUser', JSON.stringify({
        email: email,
        signedUpAt: new Date().toISOString()
      }));
    }

    /**
     * Gets saved user from localStorage
     * @returns {object|null} - User object or null
     */
    function getUser() {
      const userData = localStorage.getItem('chaiCultureUser');
      return userData ? JSON.parse(userData) : null;
    }

    /**
     * Removes user from localStorage
     */
    function removeUser() {
      localStorage.removeItem('chaiCultureUser');
    }

    // ==========================================
    // UI STATE MANAGEMENT
    // ==========================================

    /**
     * Updates UI to show signed-in state
     * @param {string} email - User email
     */
    function showSignedInState(email) {
      // Hide form, show success message
      signupForm.style.display = 'none';
      successMessage.classList.add('show');
      
      // Show user info in header
      userInfo.classList.add('show');
      userEmailDisplay.textContent = email;
      userAvatar.textContent = getAvatarLetter(email);
    }

    /**
     * Updates UI to show signed-out state
     */
    function showSignedOutState() {
      // Show form, hide success message
      signupForm.style.display = 'flex';
      successMessage.classList.remove('show');
      
      // Hide user info in header
      userInfo.classList.remove('show');
      userEmailDisplay.textContent = '';
      
      // Clear form input
      emailInput.value = '';
      clearError();
    }

    // ==========================================
    // EVENT HANDLERS
    // ==========================================

    /**
     * Handles form submission (Sign Up)
     * @param {Event} e - Submit event
     */
    function handleSignUp(e) {
      e.preventDefault();
      clearError();
      
      const email = emailInput.value.trim();
      
      // Validate empty input
      if (!email) {
        showError('Please enter your email address');
        emailInput.focus();
        return;
      }
      
      // Validate email format
      if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        emailInput.focus();
        return;
      }
      
      // Check if already signed up
      const existingUser = getUser();
      if (existingUser && existingUser.email === email) {
        showError('This email is already signed up!');
        return;
      }
      
      // Simulate submission with loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '⏳ Signing up...';
      
      // Simulate network delay for better UX
      setTimeout(() => {
        // Save user to localStorage
        saveUser(email);
        
        // Update UI to signed-in state
        showSignedInState(email);
        
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '✨ Get Early Access';
      }, 800);
    }

    /**
     * Handles sign out button click
     */
    function handleSignOut() {
      // Add confirmation animation to button
      signoutBtn.textContent = 'Signing out...';
      signoutBtn.disabled = true;
      
      setTimeout(() => {
        // Remove user from storage
        removeUser();
        
        // Update UI to signed-out state
        showSignedOutState();
        
        // Reset button
        signoutBtn.textContent = 'Sign Out';
        signoutBtn.disabled = false;
      }, 500);
    }

    /**
     * Checks initial authentication state on page load
     */
    function checkAuthState() {
      const user = getUser();
      
      if (user && user.email) {
        // User is signed in, show appropriate UI
        showSignedInState(user.email);
      } else {
        // No user, show sign up form
        showSignedOutState();
      }
    }

    // ==========================================
    // REAL-TIME INPUT VALIDATION
    // ==========================================

    /**
     * Handles real-time email validation as user types
     */
    function handleInputChange() {
      clearError();
      
      const email = emailInput.value.trim();
      
      // Show subtle visual feedback
      if (email && !isValidEmail(email)) {
        emailInput.style.borderColor = 'rgba(192, 57, 43, 0.5)';
      } else if (email && isValidEmail(email)) {
        emailInput.style.borderColor = '#D4A853';
      } else {
        emailInput.style.borderColor = 'rgba(212, 168, 83, 0.3)';
      }
    }

    // ==========================================
    // ELEMENT SDK INTEGRATION
    // ==========================================

    /**
     * Updates UI based on config changes
     * @param {object} config - Configuration object
     */
    async function onConfigChange(config) {
      // Update brand name in header
      const brandNameParts = (config.brand_name || defaultConfig.brand_name).split(' ');
      const headerBrandName = document.getElementById('header-brand-name');
      if (brandNameParts.length >= 2) {
        headerBrandName.innerHTML = `${brandNameParts[0]} <span>${brandNameParts.slice(1).join(' ')}</span>`;
      } else {
        headerBrandName.innerHTML = `<span>${config.brand_name || defaultConfig.brand_name}</span>`;
      }

      // Update tagline
      const tagline = document.getElementById('tagline');
      const taglineText = config.tagline || defaultConfig.tagline;
      // Find the word "Royal" or middle word to highlight
      const words = taglineText.split(' ');
      if (words.length >= 3) {
        const middleIndex = Math.floor(words.length / 2);
        words[middleIndex] = `<span class="highlight">${words[middleIndex]}</span>`;
        tagline.innerHTML = words.join(' ');
      } else {
        tagline.innerHTML = taglineText;
      }

      // Update hero description
      document.getElementById('hero-description').textContent = 
        config.hero_description || defaultConfig.hero_description;

      // Update launch badge text
      document.getElementById('badge-text').textContent = 
        config.launch_badge_text || defaultConfig.launch_badge_text;

      // Update footer text
      document.getElementById('footer-text').innerHTML = 
        config.footer_text || defaultConfig.footer_text;
    }

    /**
     * Maps config to editing capabilities
     * @param {object} config - Configuration object
     * @returns {object} - Capabilities object
     */
    function mapToCapabilities(config) {
      return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      };
    }

    /**
     * Maps config to edit panel values
     * @param {object} config - Configuration object
     * @returns {Map} - Map of edit panel values
     */
    function mapToEditPanelValues(config) {
      return new Map([
        ['brand_name', config.brand_name || defaultConfig.brand_name],
        ['tagline', config.tagline || defaultConfig.tagline],
        ['hero_description', config.hero_description || defaultConfig.hero_description],
        ['launch_badge_text', config.launch_badge_text || defaultConfig.launch_badge_text],
        ['footer_text', config.footer_text || defaultConfig.footer_text]
      ]);
    }

    // ==========================================
    // INITIALIZATION
    // ==========================================

    /**
     * Initializes the application
     */
    async function init() {
      // Initialize Element SDK if available
      if (window.elementSdk) {
        await window.elementSdk.init({
          defaultConfig,
          onConfigChange,
          mapToCapabilities,
          mapToEditPanelValues
        });
      }

      // Apply initial config
      const initialConfig = window.elementSdk?.config || defaultConfig;
      await onConfigChange(initialConfig);

      // Set up event listeners
      signupForm.addEventListener('submit', handleSignUp);
      signoutBtn.addEventListener('click', handleSignOut);
      emailInput.addEventListener('input', handleInputChange);
      
      // Check authentication state
      checkAuthState();
    }

    // Start the application
    init();
