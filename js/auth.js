var User;

auth.onAuthStateChanged(user => {
    User = user || null;
    //console.log(User.uid);
    setupUI(user);
    if(user){
        db.collection('links').where("author", "==", User.uid).orderBy("order", "asc").onSnapshot(snapshot => {
            setupLinkList(snapshot.docs);
        });
    }else{
        setupLinkList([]);
    }
    document.querySelector('#item-list-spinner').style.display = 'none';
});

const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
   e.preventDefault();

   //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //sign up the user

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        signupForm.reset();
    });
});

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
   e.preventDefault();
   auth.signOut().then( () => {
       console.log('user logged out');
   });
});


const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    //sign up the user

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        loginForm.reset();
    });
});