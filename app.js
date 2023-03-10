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


// WHEN THE SAVE ICON IS CLICKED

let edited;
let noteHeight;

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
            height: noteHeight
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
})




let pageLayout = document.querySelector(".page-layout");

pageLayout.style.height  = "calc(100vh - 90px)";

let pageLines = document.querySelector(".typ");

const pageHeight = $(document).height() - 121;

const height = $(document).height();

let heightChanged = false;



// INCREASING THE HEIGHT OF THE TEXTAREA USING JQUERY


$("textarea").each(function() {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px: overflow-y: hidden;");
}).on("input", function() {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
    noteHeight = (this.scrollHeight) +(60) + "px";
    // console.log(noteHeight);

    if (pageHeight <= (this.scrollHeight)) {
        pageLayout.style.height = (this.scrollHeight + 60) + "px";
        heightChanged = true;
    }else{
        pageLayout.style.height  = "calc(100vh - 90px)";
    }

    if((this.scrollHeight) > 3512 ){
        pageLines.innerHTML += `<hr><hr>`
    }
})
 

// On small screens.. the keypad changes the height of the screen.

window.addEventListener("resize", ()=>{
    if (!heightChanged ) {
        pageLayout.style.height = (height - 121) + "px";
    }
});



// TO DISPLAY NOTE CLICKED 


let isNoteClicked = localStorage.getItem("isNoteClicked");






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

    noteText.value = note.noteTitle;
    text.value = note.noteBody;

    timeContainer.textContent = note.time;

    pageLayout.style.height = note.height;
    pageLines.style.height = note.height;
    text.style.height = note.height;
}