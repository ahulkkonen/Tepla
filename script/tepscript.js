function myFunction() {
            if (document.getElementById("page1").style.zIndex == 2 ) {
                  document.getElementById("page1").style.zIndex = 1 ;
                  document.getElementById("page2").style.zIndex = 2 ;
            }
            else {
                  document.getElementById("page1").style.zIndex = 2 ;
                  document.getElementById("page2").style.zIndex = 1 ; 
            }
  }
