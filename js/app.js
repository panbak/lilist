const linkList = document.querySelector('#links');

const setupLinkList = (data) => {
    let html = '';
    data.forEach(doc => {
        const linkObj = doc.data();
        const link = `
            
            <div class="list-group-item" data-id="${doc.id}">
              <i class="fas fa-grip-vertical"></i>
              <div class="d-flex">
                  <h5 class="mb-2 h5 mr-auto ml-5"><i class="${linkObj.icon} mr-1"></i> ${linkObj.title} <small>(${linkObj.content})</small></h5>
                  <button type="button" class="btn btn-sm btn-danger delete-link-btn" data-id="${doc.id}">Delete</button>
              </div>
            </div>
        `;
        html+=link;
    });
    linkList.innerHTML = html;
}
const linksSection = document.querySelector('#links-section');
const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const forms = document.querySelector('#forms');

const setupUI = (user) => {
    let pathArray = window.location.pathname.split('/');
    if(pathArray[0]>0){
        alert(window.location.pathname);
    }
    if(user){
        let html = `
            <h5>Logged in as <strong>${user.email}</strong></h5>
        `;
        document.querySelector('#account-details').innerHTML = html;

        loggedInLinks.forEach(item => {
            item.style.display = 'block';
        });
        loggedOutLinks.forEach(item => {
            item.style.display = 'none';
        });
        forms.style.display = 'none';
        linksSection.style.display = 'flex';
    } else {
        loggedInLinks.forEach(item => {
            item.style.display = 'none';
        });
        loggedOutLinks.forEach(item => {
            item.style.display = 'block';
        });
        forms.style.display = 'flex';
        linksSection.style.display = 'none';
    }
}

var sortableList = new Sortable(linkList, {
    handle: '.fa-grip-vertical',
    animation: 150,
    onSort: function (evt) {
        for (let i=parseInt(evt.newIndex); i<sortableList.toArray().length; i++){
            db.collection('links').doc(sortableList.toArray()[i]).update({
                "order": i
            }).then(() => {
                    console.log("Document successfully updated!");
            });
        }
    },
});
const usernameInput = document.querySelector('#username');
usernameInput.addEventListener('blur', () => {
    console.log('blut');
    db.collection('users').doc(User.uid).set({
        username: usernameInput.value,
        theme: 0,
        picture: 'none'
    }).then(() => {
        console.log("user successfully updated!");
    });
});
