// Get the modal
/*var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} */

function AuthorizeCookie(){
    var modal = document.getElementById("myModal");
    var btnRefuser = document.getElementById("refuser");
    var btnValider = document.getElementById("valider");

   
    modal.style.display = "block";
      
    btnRefuser.onclick = function() {
        modal.style.display = "none";
      }

    btnValider.onclick = function(){
        let script = document.createElement('script');
       script.async = true;
        script.setAttribute('src', "https://www.googletagmanager.com/gtag/js?id=G-8QT22541LQ");
      
        script.innerHTML = "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-8QT22541LQ');"
        document.head.appendChild(script);
        modal.style.display = "none";

    }
      
      // When the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      } 
}