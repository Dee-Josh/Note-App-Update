// DOM IMPLEMENTATION

const save = document.querySelector(".fa-check");
const back = document.querySelector(".back-link");
const text = document.querySelector(".overlay");
text.setAttribute("focus", true);
const noteText = document.querySelector(".note-title");

const editNote = document.querySelector(".edit-note");
const pen = document.querySelector(".fa-pencil");

const closeNote = document.querySelector(".fa-xmark");
const exit = document.querySelector(".exit");
const decline = document.querySelector(".decline");


const timeContainer = document.querySelector(".time");

const noteStatus = document.querySelector(".status");

let newText;
let noteTitle;

let clickedNoteIndex;

let notes = JSON.parse(localStorage.getItem("notes"));

if (notes === null || notes[0] === undefined) { 
    notes = [];
    i = 0;
}else{
    i = notes[0].index + 1;
}


// GETTING TIME AND DATE


let time = new Date;
let amPm;
let day = time.getDate();
let month = time.getMonth() + 1;
let year = time.getFullYear() - 2000;
let hour = time.getHours();

if (hour > 12) {
    hour-=12;
    amPm = "PM";
}else{
    amPm = "AM";
}
if (hour === 0) {
    hour = 12;
}
let min = time.getMinutes();

if (JSON.stringify(min).length < 2) {
    min = "0" + min;
}

timeContainer.textContent = `${day}/${month}/${year}  ${hour}:${min} ${amPm}`;





let pageLayout = document.querySelector(".page-layout");

pageLayout.style.height  = "calc(100vh - 90px)";

let pageLines = document.querySelector(".typ");

const pageHeight = $(".page-layout").height() - 121;
console.log(pageHeight);

const height = window.innerHeight;

let heightChanged = false;






// WHEN THE SAVE ICON IS CLICKED

let edited;
let noteHeight;

let once;

save.addEventListener("click", ()=>{
    newText = text.value;
    noteTitle = noteText.value;

    if (noteTitle === "") {
        alert("Please Enter a Note Title");
    }else if (newText === ""){
        alert("Cannot save empty note");
    }else{
        let time = new Date;
        let amPm;
        let day = time.getDate();
        let month = time.getMonth() + 1;
        let year = time.getFullYear() - 2000;
        let hour = time.getHours();
        if (hour > 12) {
            hour-=12;
            amPm = "PM";
        }else{
            amPm = "AM";
        }
        if (hour === 0) {
            hour = 12;
        }
        let min = time.getMinutes();
        if (JSON.stringify(min).length < 2) {
            min = "0" + min;
        }
    
        timeContainer.textContent = `${day}/${month}/${year}  ${hour}:${min} ${amPm}`;
        let noteTime= `${day}/${month}/${year}  ${hour}:${min} ${amPm}`;
    
        
        save.classList.add("display-none");
        back.classList.remove("display-none");
        noteStatus.textContent = "Saved";
    
        let note = {
            noteTitle: noteTitle,
            noteBody: newText,
            time: noteTime,
            index: i,
            height: noteHeight,
            heightChanged: heightChanged
        }

        if (edited){
            if (clickedNoteIndex) {
                notes.splice(clickedNoteIndex, 1);
            }else{
                notes.splice(0, 1);
            }
            notes.unshift(note);
    
        }else{
            notes.unshift(note);
            // console.log(notes);
        }
    
       
    
    
        localStorage.setItem("notes", JSON.stringify(notes));
        text.setAttribute("disabled", true);
        noteText.setAttribute("disabled", true);
        editNote.classList.remove("opaque");
    }
    edited = false;
})


closeNote.addEventListener("click", ()=>{
    exit.classList.add("display-close");
});

decline.addEventListener("click", ()=>{
    
    exit.classList.remove("display-close");
});


// TO ALLOW RE-EDITING


pen.addEventListener("click", ()=>{
    save.classList.remove("display-none");
    back.classList.add("display-none");
    noteStatus.textContent = "Editing";

    text.removeAttribute("disabled");
    noteText.removeAttribute("disabled");
    editNote.classList.add("opaque");
    text.focus();

    edited = true;




    text.style.height = "1000%";
    pageLayout.style.height = "";
    pageLines.style.height = "";
    once = true;
    
})



// TO DISPLAY NOTE CLICKED 


let isNoteClicked = localStorage.getItem("isNoteClicked");



let windowHeightCheck;


if(isNoteClicked === "true"){
    let clickedNote = localStorage.getItem("clickedNote");

    clickedNoteIndex = clickedNote;

    noteText.setAttribute("disabled", true);
    text.setAttribute("disabled", true);
    editNote.classList.remove("opaque");

    save.classList.add("display-none");
    back.classList.remove("display-none");
    noteStatus.textContent = "Saved";

    let note = notes[clickedNote];
    windowHeightCheck = note;

    noteText.value = note.noteTitle;
    text.value = note.noteBody;

    timeContainer.textContent = note.time;
    console.log(note.height);

    if (note.height > (height - 121)) {
        text.style.height = note.height + "px";
        pageLayout.style.height = note.height + "px";
        pageLines.style.height = note.height + "px";
    }else{
        pageLayout.style.height = (height - 108) + "px";
        pageLines.style.height = (height - 108) + "px";
        text.style.height = (height - 108) + "px";
    }  
}


// INCREASING THE HEIGHT OF THE TEXTAREA USING JQUERY


$("textarea").each(function() {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;");
}).on("input", function() {

    if (once) {
        text.style.height = "";
      once = false;
    }
    // this.style.height = height;

    if ((this.scrollHeight) > height) {
        pageLayout.style.height = (this.scrollHeight) + "px";
        pageLayout.style.overflow = "hidden";
        pageLines.style.height = (this.scrollHeight) + "px";
        // text.style.height = (this.scrollHeight) + "px";
        
    }else{
        pageLayout.style.height = height + "px";
        pageLayout.style.overflow = "hidden";
        pageLines.style.height = height + "px";
        // text.style.height = (this.scrollHeight) + "px";
    }
  
    if ((this.scrollHeight) > height) {
        this.style.height = (this.scrollHeight) + "px";
        // this.style.paddingBottom = "60px";
        // text.style.height = (this.scrollHeight) + "px";
    }
    noteHeight = (this.scrollHeight) +(60);
    console.log((this.scrollHeight));


    if (pageHeight <= (this.scrollHeight)) {
        pageLayout.style.height = (this.scrollHeight + 60) + "px";
        heightChanged = true;
    }else{
        // // pageLayout.style.height  = "calc(100vh - 90px)";
        // pageLayout.style.height = (pageHeight - 121) + "px";
        // heightChanged = false;
        // alert("ggg")
    }

    if((this.scrollHeight) > 3512 ){
        pageLines.innerHTML += `<hr><hr>`
    }

})
 



// On small screens.. the keypad changes the height of the screen.


window.addEventListener("resize", ()=>{
    if (isNoteClicked === "true") {
        heightChanged = windowHeightCheck.heightChanged;
        if (!heightChanged) {
            pageLayout.style.height = (height - 121) + "px";
        }else{
            
            // text.style.height = noteHeight;
            // pageLayout.style.height = noteHeight;
            // pageLines.style.height = noteHeight;
        }
    }else{
        if (!heightChanged) {
            pageLayout.style.height = (height - 121) + "px";
            // alert("jjjj")
        }
    }
});




