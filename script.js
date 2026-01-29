document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signupContainer = document.getElementById('signup-container');
    const successContainer = document.getElementById('success-container');
    const authStatus = document.getElementById('auth-status');
    const signoutBtn = document.getElementById('signout-btn');
    const emailInput = document.getElementById('email');

    // Check if user is already signed up
    const checkUserStatus = () => {
        const userEmail = localStorage.getItem('chai_culture_user');
        
        if (userEmail) {
            signupContainer.classList.add('hidden');
            successContainer.classList.remove('hidden');
            authStatus.innerHTML = `Welcome, <strong>${userEmail.split('@')[0]}</strong>`;
        } else {
            signupContainer.classList.remove('hidden');
            successContainer.classList.add('hidden');
            authStatus.innerHTML = '';
        }
    };

    // Handle Form Submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (email) {
            // Simulate API call delay
            const btn = signupForm.querySelector('button');
            const originalText = btn.innerText;
            btn.disabled = true;
            btn.innerText = 'Requesting Invite...';

            setTimeout(() => {
                localStorage.setItem('chai_culture_user', email);
                checkUserStatus();
                btn.disabled = false;
                btn.innerText = originalText;
                emailInput.value = '';
                
                // Trigger a nice success scroll if on mobile
                if (window.innerWidth < 992) {
                    successContainer.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        }
    });

    // Handle Sign Out
    signoutBtn.addEventListener('click', () => {
        localStorage.removeItem('chai_culture_user');
        checkUserStatus();
    });

    // Initial check
    checkUserStatus();

    // Scroll reveal effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 249, 227, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            header.style.padding = '1rem 0';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
            header.style.padding = '2rem 0';
        }
    });
});
