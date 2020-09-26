const addLinkForm = document.querySelector('#add-link-form');
const addBtn = document.querySelector('#add-item-button');
addLinkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addBtn.innerHTML='<span class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>Loading...';

    if(!validInput(addLinkForm)){
        return;
    }
    db.collection('links').add({
        icon: addLinkForm['icon'].value,
        title: addLinkForm['title'].value,
        content: addLinkForm['url'].value,
        author: User.uid,
        order: sortableList.toArray().length
    }).then(() => {
        addLinkForm.reset();
        addBtn.innerHTML='Add';
    }).catch((err)=>{
        alert(err.message);
        addBtn.innerHTML='Add';
    });
});


$(document).on('click','.delete-link-btn',function(){
    db.collection('links').doc($(this).attr('data-id')).delete().then(function() {
            console.log("Document successfully deleted!");
            for (let i=0; i<sortableList.toArray().length; i++){
                db.collection('links').doc(sortableList.toArray()[i]).update({
                    "order": i
                }).then(() => {
                    console.log("Document successfully updated!");
                }).catch(() => {
                    console.log('Link not found!');
                });
            }
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
});

function validInput(form) {
    if(!validURL(form['url'].value)){
        alert('Invalid url');
        return false;
    }
    if(form['title'].value.length === 0){
        alert('Title is required');
        return false;
    }
    return true;
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
}