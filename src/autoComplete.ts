export class AutoComplete {
  currentfocus: number = 0;
  autoComplete(inp: any, arr: string[]): void {
    inp.addEventListener("input", (e: any) => {
      var a,
        b,
        i,
        val = (<HTMLInputElement>document.getElementById("myInput")).value;
      /*close any already open lists of autocompleted values*/
      closeAllLists(inp);
      if (!val) {
        return false;
      }
      this.currentfocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute(
        "id",
        document.getElementById("myInput") + "autocomplete-list"
      );
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      document.body.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", (e: MouseEvent) => {
            /*insert the value for the autocomplete text field:*/
            let ele = <HTMLElement>e.target;
            inp.value = (<HTMLInputElement>(
              ele.getElementsByTagName("input")[0]
            )).value;
            /*close the list of autocompleted values,
          (or any other open lists of autocompleted values:*/
            closeAllLists(inp.value);
          });
          a.appendChild(b);
        }
      }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", (e: any) => {
      var x = <any>(
        document.getElementById(
          document.getElementById("myInput") + "autocomplete-list"
        )
      );
      if (x) x = x.getElementsByTagName("div");

      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
       increase the currentFocus variable:*/
        this.currentfocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (this.currentfocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[this.currentfocus].click();
        }
      }
    });

    const addActive = (x: any) => {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (this.currentfocus >= x.length) this.currentfocus = 0;
      if (this.currentfocus < 0) this.currentfocus = x.length - 1;
      /*add class "autocomplete-active":*/
      x[this.currentfocus].classList.add("autocomplete-active");
    };
    function removeActive(x: any): void {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    const closeAllLists = (elmnt: any): void => {
      /*close all autocomplete lists in the document,
  except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != document.getElementById("myInput")) {
          var parentNode = x[i].parentNode;
          if (parentNode) {
            parentNode.removeChild(x[i]);
          }
        }
      }
    };
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", (e: MouseEvent) => {
      closeAllLists(e.target);
    });
  }
}
