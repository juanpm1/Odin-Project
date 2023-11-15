"use strict";

let bookshelves = [[2,2,1,false]];
const LIBRARY = document.querySelector(".library");
const MODAL_ELEMENT = document.querySelector(".modal");
const MAIN = document.querySelector(".main");
const ADD_BOOK_BTN = document.querySelector(".add-book-btn");
const CANCEL_MODAL = document.querySelector(".cancel-btn");
const CONFIRM_MODAL = document.querySelector(".add-btn"); 
const BOOK_NAME = document.querySelector(".book-name");
const BOOK_DESCRIPTION = document.querySelector(".book-description");
const BOOK_N_PAGES = document.querySelector(".book-npages");
const BOOK_READED = document.querySelector(".book-readed");
const TOTAL_BOOKS = document.querySelector(".total-books");
const TOTAL_BOOKS_READED = document.querySelector(".books-readed");
const TOTAL_BOOKS_NOT_READED = document.querySelector(".books-not-readed");
const INFO_BUTTON = document.querySelector(".info-button");
const INFO_CONTAINER = document.querySelector(".aside-closed");

let bookCount = 0;
let bookReadedCount = 0;
let bookNotReadedCount = 0;
let infoClosed = true;

INFO_BUTTON.addEventListener("click",()=>{
    if(infoClosed){
        INFO_BUTTON.style.transform = "rotate(180deg)";
        INFO_CONTAINER.classList.replace("aside-closed", "aside");
        infoClosed = false;
    }
    else{
        INFO_BUTTON.style.transform = "rotate(0)";
        INFO_CONTAINER.classList.replace("aside", "aside-closed");
        infoClosed = true;
    } 
});

ADD_BOOK_BTN.addEventListener("click",()=>{
    modal();
    resetModal();
})

CONFIRM_MODAL.addEventListener("click", (e)=>{
    e.preventDefault();
    if(checkModal()){
        addBook();
        CANCEL_MODAL.click();
        showBooks();
    }      
});

const modal = () =>{
    MODAL_ELEMENT.style.display = "block";
    MAIN.classList.add("main-blur");
    ADD_BOOK_BTN.setAttribute("disabled", "true");

    CANCEL_MODAL.addEventListener("click",()=>{
        MODAL_ELEMENT.style.display = "none";
        MAIN.classList.remove("main-blur");
        ADD_BOOK_BTN.removeAttribute("disabled");
    });
}

const checkModal = () => {
    const INPUTS = [BOOK_NAME, BOOK_DESCRIPTION];
    for(const INPUT of INPUTS){
        if(INPUT.value.trim() === ""){
            errorModal(INPUT);
            return false
        }
        else if(BOOK_N_PAGES.value > 3031)BOOK_N_PAGES.value = 3031;
    }
    return true;              
}

const errorModal = element =>{
    element.style.borderBottom = "1px solid rgb(224, 80, 80)"
    setTimeout(()=>{    
        element.style.borderBottom = "1px solid rgb(128, 128, 128)"
    },2000);
}

const resetModal = () =>{
    BOOK_NAME.value = null;
    BOOK_DESCRIPTION.value = null;
    BOOK_READED.checked = false;
    BOOK_N_PAGES.value = 1;
}


const showBooks = () => {
    LIBRARY.innerHTML = "";
    for(let [title, description, npages, readed] of bookshelves){
        const H3_TITLE = document.createElement("h3");
        H3_TITLE.className = "text-center m-3";
        H3_TITLE.textContent = title;

        const H4_DESCRIPTION = document.createElement("p");
        const P_DESCRIPTION = document.createElement("p");
        H4_DESCRIPTION.textContent = "Description:";
        P_DESCRIPTION.textContent = description;

        const P_NPAGES = document.createElement("p");
        P_NPAGES.textContent = `Pages: ${npages}`;
        P_NPAGES.className = "n-pages";

        const INPUT_DIV = document.createElement("div");
        INPUT_DIV.className = "form-check form-switch";
        
        const LABEL_READED = document.createElement("label");
        LABEL_READED.className = "form-check-label";
        LABEL_READED.textContent = "Readed";

        const INPUT_READED = document.createElement("input");
        INPUT_READED.className = "form-check-input";
        INPUT_READED.id = "switch";
        INPUT_READED.type = "checkbox";
        INPUT_READED.role = "switch";
        if(readed)INPUT_READED.setAttribute("checked", "true");

        const DIV = document.createElement("div");
        DIV.className ="book";

        INPUT_DIV.appendChild(LABEL_READED);
        INPUT_DIV.appendChild(INPUT_READED);
        DIV.appendChild(H3_TITLE);
        DIV.appendChild(H4_DESCRIPTION);
        DIV.appendChild(P_DESCRIPTION);
        DIV.appendChild(P_NPAGES);
        DIV.appendChild(INPUT_DIV);
        LIBRARY.appendChild(DIV);
    }               
}

const addBook = () =>{
    let title = BOOK_NAME.value;
    let description = BOOK_DESCRIPTION.value;
    let npages = BOOK_N_PAGES.value;
    let readed = BOOK_READED.checked;
    bookshelves.push([title,description,npages,readed]);
    bookCount++;
    if(readed)bookReadedCount++;
    else bookNotReadedCount++;
    updateInformation();
}

const updateInformation = () =>{
    TOTAL_BOOKS.textContent = `Total Books: ${bookCount}`;
    TOTAL_BOOKS_READED.textContent = `Books Readed: ${bookReadedCount}`;
    TOTAL_BOOKS_NOT_READED.textContent = `Books not readed: ${bookNotReadedCount}`;
}

showBooks();
updateInformation();