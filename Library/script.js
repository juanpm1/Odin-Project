"use strict";

let bookshelves = [[2,2,1,false],[2,2,1,true]];
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

let infoClosed = true;
const toggleInfo = () =>{
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
}

INFO_BUTTON.addEventListener("click",toggleInfo);
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
        updateInformation();
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
    LIBRARY.innerHTML = bookshelves.map(([title, description, npages, readed]) => `
        <div class="book">
            <h3 class="text-center m-3">${title}</h3>
            <p>Description: ${description}</p>
            <p class="n-pages">Pages: ${npages}</p>
            <div class="form-check form-switch">
                <label class="form-check-label">Readed</label>
                <input class="form-check-input input-switch" id="switch" type="checkbox" role="switch" onclick="updateInformation()" ${readed ? 'checked' : ''}>
            </div>
        </div>`);
};

const addBook = () =>{
    let title = BOOK_NAME.value;
    let description = BOOK_DESCRIPTION.value;
    let npages = BOOK_N_PAGES.value;
    let readed = BOOK_READED.checked;
    bookshelves.push([title,description,npages,readed]);
}


const updateInformation = () =>{
    const SWITCH = document.querySelectorAll(".input-switch");

    let bookCount = bookshelves.length;
    let bookReadedCount = 0;
    let bookNotReadedCount = 0;
    for(let switches of SWITCH){
        if(switches.checked) bookReadedCount++;
        else bookNotReadedCount++;
    }

    TOTAL_BOOKS.textContent = `Total Books: ${bookCount}`;
    TOTAL_BOOKS_READED.textContent = `Books Readed: ${bookReadedCount}`;
    TOTAL_BOOKS_NOT_READED.textContent = `Books not readed: ${bookNotReadedCount}`;
}

if(bookshelves.length > 0){
    showBooks();
    updateInformation();
}


