const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('load');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photoArray = [];

//Creat Elements For Links & photos, Add to Dom
function displayPhoto() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log('total images', totalImages);
    // Run function for each object in photoArray 
    photoArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        //    Event Listener,Check when each is finished loading
        img.addEventListener('load', imageLoaded)
            // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
//Unsplash API
const count = 10;
const apiKey = 'eKUQYhy6XPu6RiVqZJzRMDPyLDMj0EL_DY-ok0OwZSA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
    } catch (error) {
        // catch error here 
    }
}
// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}
// Check to see if scrolling near bottom of page,Load More Photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY <= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();

    }
});

// On Load 
getPhotos();